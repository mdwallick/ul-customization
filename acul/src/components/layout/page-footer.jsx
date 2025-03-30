import { cn } from "@/lib/utils";

export default function PageFooter() {
    return (
        <footer className={cn("py-2 text-center text-white/60 bg-sky-950/60")}>
            <span className={cn("inline-block pr-1 text-sm font-semibold")}>
                © 2025 MyApp Inc. All Rights Reserved
            </span>
        </footer>
    );
}
