"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "../../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import React, { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("fixed bottom-4 right-4 z-[6000] md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute right-0 bottom-full mb-4 flex flex-col items-end gap-3"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <div
                                    onClick={() => {
                                        if (item.onClick) item.onClick();
                                        setOpen(false);
                                    }}
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] cursor-pointer"
                                    style={{ filter: "url(#displacementFilter)" }}
                                >
                                    <div className="h-6 w-6 text-neutral-500 dark:text-neutral-300">{item.icon}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            >
                <IconLayoutNavbarCollapse className="h-7 w-7 text-neutral-600 dark:text-neutral-300" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
}) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[5000]">
            {/* SVG Filter for Glassmorphism Distortion */}
            <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
                <filter id="displacementFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.01"
                        numOctaves="2"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="4"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>

            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className={cn(
                    "mx-auto hidden h-16 items-end gap-4 rounded-[2rem] px-4 pb-3 md:flex",
                    "bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10",
                    "shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]",
                    className
                )}
                style={{
                    backdropFilter: "blur(20px)",
                }}
            >
                {/* Displacement Layer (Frost Effect) */}
                <div
                    className="absolute inset-0 rounded-[2rem] -z-10 pointer-events-none opacity-40 bg-white/5"
                    style={{
                        filter: "url(#displacementFilter)",
                        mixBlendMode: "overlay"
                    }}
                />

                {items.map((item) => (
                    <IconContainer mouseX={mouseX} key={item.title} {...item} />
                ))}
            </motion.div>
        </div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    onClick
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20],
    );

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <div onClick={onClick} className="cursor-pointer">
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex aspect-square items-center justify-center rounded-[1.5rem] bg-white/5 dark:bg-neutral-800/10 border border-white/10 shadow-inner group overflow-hidden"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute -top-10 left-1/2 w-fit rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl px-2 py-1 text-xs whitespace-pre text-neutral-800 dark:text-white"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subtle Icon Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center text-neutral-600 dark:text-neutral-200 transition-transform group-hover:scale-110"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </div>
    );
}
