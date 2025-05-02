'use client';

import { interpolate } from 'flubber';
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { useEffect, useState } from 'react';

const getIndex = (_: string, index: number) => index;

function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });
}

export function PathMorphing({
  paths,
  color,
  ...props
}: {
  paths: string[];
  color: string;
} & React.SVGProps<SVGSVGElement>) {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(
    progress,
    paths.map(getIndex),
    paths.map(() => color),
  );
  const path = useFlubber(progress, paths);

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.8,
      ease: 'easeInOut',
      onComplete: () => {
        setTimeout(() => {
          if (pathIndex === paths.length - 1) {
            progress.set(0);
            setPathIndex(1);
          } else {
            setPathIndex(pathIndex + 1);
          }
        }, 3000);
      },
    });

    // if (pathIndex === paths.length - 1) {
    //   animation.stop();
    // }

    return () => animation.stop();
  }, [pathIndex, paths.length, progress]);

  return (
    <div className="relative">
      <svg {...props} width="144" height="144">
        <g className=" scale-[6]">
          <motion.path fill={fill} d={path} />
        </g>
      </svg>
    </div>
  );
}
