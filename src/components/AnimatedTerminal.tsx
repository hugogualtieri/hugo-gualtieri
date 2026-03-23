"use client";

import { useState, useEffect, useRef } from "react";

const COMMANDS = [
  { prompt: "$ kubectl get pods -n production", output: [
    "NAME                        READY   STATUS    RESTARTS   AGE",
    "api-server-7d4b8c6f9-x2k4l  1/1    Running   0          3d",
    "worker-5f8a9c3d1-m7n2p      1/1    Running   0          3d",
    "redis-master-0               1/1    Running   0          7d",
  ]},
  { prompt: "$ terraform plan -out=deploy.tfplan", output: [
    "Refreshing Terraform state...",
    "",
    "Plan: 3 to add, 1 to change, 0 to destroy.",
    "Saved to: deploy.tfplan",
  ]},
  { prompt: "$ docker build -t api:v2.4.1 .", output: [
    "[+] Building 12.3s (14/14) FINISHED",
    " => [internal] load build definition",
    " => [stage-1 3/3] COPY --from=builder /app .",
    " => exporting to image   api:v2.4.1",
  ]},
  { prompt: "$ ansible-playbook deploy.yml -i prod", output: [
    "PLAY [Deploy to production] ***",
    "",
    "TASK [Pull latest image] ***",
    "changed: [prod-01]",
    "changed: [prod-02]",
    "",
    "PLAY RECAP ***",
    "prod-01: ok=5  changed=2  failed=0",
  ]},
  { prompt: "$ python3 train_model.py --epochs 50", output: [
    "Loading dataset... 12,847 samples",
    "Epoch 48/50 — loss: 0.0312 — acc: 97.4%",
    "Epoch 49/50 — loss: 0.0298 — acc: 97.6%",
    "Epoch 50/50 — loss: 0.0284 — acc: 97.8%",
    "Model saved → models/v3.2.pt",
  ]},
];

const TYPING_SPEED = 35;
const LINE_DELAY = 80;
const PAUSE_AFTER_CMD = 1200;

const AnimatedTerminal = () => {
  const [lines, setLines] = useState<{ text: string; type: "prompt" | "output" }[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [isTypingPrompt, setIsTypingPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cmdIndex = useRef(0);
  const running = useRef(true);

  useEffect(() => {
    running.current = true;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const typeCommand = async (cmd: typeof COMMANDS[0]) => {
      if (!running.current) return;

      setIsTypingPrompt(true);
      for (let i = 0; i <= cmd.prompt.length; i++) {
        if (!running.current) return;
        setCurrentTyping(cmd.prompt.slice(0, i));
        await sleep(TYPING_SPEED);
      }
      setIsTypingPrompt(false);
      setCurrentTyping("");
      setLines((prev) => [...prev, { text: cmd.prompt, type: "prompt" }]);
      await sleep(300);

      for (const line of cmd.output) {
        if (!running.current) return;
        setLines((prev) => [...prev, { text: line, type: "output" }]);
        await sleep(LINE_DELAY);
      }

      await sleep(PAUSE_AFTER_CMD);
    };

    const run = async () => {
      while (running.current) {
        const cmd = COMMANDS[cmdIndex.current % COMMANDS.length];
        await typeCommand(cmd);
        cmdIndex.current++;
        setLines((prev) => prev.slice(-20));
      }
    };

    run();
    return () => { running.current = false; };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentTyping]);

  return (
    <div className="w-full h-full rounded-xl border bg-[hsl(220,20%,8%)] overflow-hidden flex flex-col font-mono text-[13px] leading-relaxed shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[hsl(220,15%,15%)] bg-[hsl(220,18%,10%)]">
        <span className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)]" />
        <span className="w-3 h-3 rounded-full bg-[hsl(45,80%,55%)]" />
        <span className="w-3 h-3 rounded-full bg-[hsl(130,50%,45%)]" />
        <span className="ml-3 text-[11px] text-[hsl(220,10%,45%)]">hugo@cloud ~ </span>
      </div>

      <div ref={containerRef} className="flex-1 p-4 overflow-y-auto space-y-0.5 scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "prompt" ? "text-[hsl(168,45%,55%)]" : "text-[hsl(220,10%,65%)]"}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {isTypingPrompt && (
          <div className="text-[hsl(168,45%,55%)]">
            {currentTyping}
            <span className="inline-block w-2 h-4 bg-[hsl(168,45%,55%)] ml-0.5 animate-pulse align-middle" />
          </div>
        )}
        {!isTypingPrompt && (
          <div className="text-[hsl(168,45%,55%)]">
            <span className="inline-block w-2 h-4 bg-[hsl(168,45%,55%)] animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedTerminal;
