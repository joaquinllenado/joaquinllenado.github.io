import { motion } from "motion/react";

const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "HTML", "CSS"],
  "AI/ML": [
    "LangChain",
    "LangGraph",
    "LLM Integration",
    "Prompt Engineering",
    "RAG",
    "MCP",
  ],
  "Frameworks & Libraries": [
    "FastAPI",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Tailwind CSS",
    "Prisma",
    "Shadcn",
    "Pydantic",
  ],
  Tools: [
    "GitHub",
    "Docker",
    "CloudFlare",
    "Supabase",
    "PostgreSQL",
    "NeonDB",
    "AWS",
    "n8n",
    "Vercel",
    "Posthog",
    "Cursor",
    "Claude Code",
  ],
};

export default function Skills() {
  return (
    <div className="flex flex-col gap-6">
      {Object.entries(skills).map(([category, items], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="flex flex-col gap-3"
        >
          <h3 className="text-xs sm:text-sm md:text-sm lg:text-base font-semibold text-muted-foreground">
            {category}
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {items.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: categoryIndex * 0.1 + index * 0.05,
                }}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-muted text-foreground rounded-lg text-xs sm:text-sm md:text-sm lg:text-base font-medium hover:bg-accent/80 transition-colors duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
