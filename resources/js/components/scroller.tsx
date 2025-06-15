import React from 'react';

interface ScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'horizontal' | 'vertical';
    children: React.ReactNode;
    gap?: string; // Optional: allow custom gap
}

export function Scroller({
                             variant = 'vertical',
                             children,
                             className = '',
                             ...props
                         }: ScrollerProps) {
    const isHorizontal = variant === 'horizontal';
    return (
        <div
            className={
                `${isHorizontal
                    ? `flex flex-row overflow-x-auto overflow-y-hidden`
                    : 'flex flex-col  overflow-y-auto overflow-x-hidden'
                } gap-4 p-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ${className}`
            }
            style={{
                maxHeight: isHorizontal ? undefined : '100%',
                maxWidth: isHorizontal ? '100%' : undefined,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

export default Scroller;
