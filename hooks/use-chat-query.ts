
import qs from "query-string";
import { useSocket } from "@/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
interface useChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}
export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: useChatQueryProps) => {
    const { isConnected } = useSocket();

    const fetchMessages = async ({ pageParam = 1 }) => {
        const url = qs.stringifyUrl({
          url: apiUrl,
          query: {
            cursor: pageParam,
            [paramKey]: paramValue,
          }
        }, { skipNull: true });
    
        const res = await fetch(url);
        return res.json();
      };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
    })

    return {
        data, fetchNextPage, hasNextPage, isFetchingNextPage, status
    }
}