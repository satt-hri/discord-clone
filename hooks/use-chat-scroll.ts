import { Fascinate } from "next/font/google";
import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
}


const useChatScroll = ({ chatRef, bottomRef, shouldLoadMore, loadMore, count }: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false)

    useEffect(() => {
        const topDiv = chatRef.current;
        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;
            if (scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }

        }
        topDiv?.addEventListener("scroll", handleScroll)

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll)
        }

    }, [loadMore(), chatRef, shouldLoadMore])


    useEffect(() => {
        const bottomDiv = bottomRef.current;
        const topDiv = chatRef.current;
        const shouldAutoScoll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true)
                return true
            }
            if (!topDiv) {
                return false
            }
            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100
        }
        if (shouldAutoScoll()) {
            setTimeout(() => {
                bottomDiv?.scrollIntoView({ behavior: "smooth" })
            }, 100);
        }
    }, [bottomRef,chatRef,count,hasInitialized])

}

export default useChatScroll;