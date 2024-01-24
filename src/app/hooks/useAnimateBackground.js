import { useEffect, useState } from "react";

export const useAnimateBackground = () => {
    const [showEffect, setShowEffect] = useState({ show: false, id: 0 });

    useEffect(() => {
        if (showEffect.show) {
            const timeoutId = setTimeout(() => {
                setShowEffect({ show: false, id: 0 });
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [showEffect]);

    return [showEffect, setShowEffect];
}
