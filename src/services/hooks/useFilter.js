import {useMemo} from 'react';

export const useSortedItemList = (itemList, sort) => {
    const sortedItemList = useMemo(() => {
        
        if (sort) {
            return [...itemList].sort((a, b) => a[sort].localeCompare(b[sort]))
        } 
        return itemList;
    }, [sort, itemList]);

    return sortedItemList;
}

export const useSearch = (itemList, sort, search) => {
    const sortedItemList = useSortedItemList(itemList,sort);
    
    const searchedAndSortedItemList = useMemo(() => {
        return sortedItemList.filter(project => project.title.toLowerCase().includes(search.toLowerCase()));
    }, [sortedItemList, search]);

    return searchedAndSortedItemList;
}

export const useFilter = (itemList, sort, search, deadline) => {
    const searchedAndSortedItemList = useSearch(itemList, sort, search);

    if (deadline) {
        return searchedAndSortedItemList.filter(item => item.deadline <= deadline);
    } else {
        return searchedAndSortedItemList;
    }
}