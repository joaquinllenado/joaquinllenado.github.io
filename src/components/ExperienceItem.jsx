import { useState, useRef } from "react";
import { playClack } from "../lib/sound";

export default function ExperienceItem({ role, company, date, bullets }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className="mb-6 last:mb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={playClack}
        className="w-full text-left bg-transparent border-none p-0 cursor-pointer font-geist group"
      >
        <div className="flex items-baseline justify-between gap-3 mb-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-medium text-[#111] dark:text-[#e8e8e8] group-hover:underline">{role}</span>
          </div>
          <span className="text-[12px] text-[#888] dark:text-[#555] whitespace-nowrap shrink-0">{date}</span>
        </div>
        <div className="text-[13px] text-[#888] dark:text-[#777]">{company}</div>
      </button>

      <div
        ref={bodyRef}
        style={{
          maxHeight: open ? bodyRef.current?.scrollHeight + "px" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.2s ease",
        }}
      >
        <ul className="mt-2.5 space-y-1 list-none p-0">
          {bullets.map((b, i) => (
            <li key={i} className="text-[13px] text-[#6b7280] dark:text-[#888] leading-[1.65] pl-3.5 relative">
              <span className="absolute left-0 text-[#d1d5db] dark:text-[#444]">–</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
