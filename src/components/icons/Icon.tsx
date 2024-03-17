import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { useMemo } from 'react';

interface IconProps extends LucideProps {
    name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
    const LucideIcon = useMemo(() => dynamic(dynamicIconImports[name]), [name]);

    return <LucideIcon {...props} />;
};

export default Icon;