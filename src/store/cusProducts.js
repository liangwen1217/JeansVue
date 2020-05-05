import axios from 'axios';

export default {
    state: {
        collected: JSON.parse(localStorage.getItem('collectedItems')) || [],
    },
    mutations: {
        COLLECTED(state, lovedItem) {
            state.loveItemIdList.push(lovedItem.id);
            state.collected.push(lovedItem);
            // 儲存至 localStorage
            localStorage.setItem('collectedItems', JSON.stringify(state.collected));
          },
          DISCOLLECTED(state, lovedItemId) {
            const index = state.loveItemIdList.indexOf(lovedItemId);
            state.loveItemIdList.splice(index, 1);
            state.collected.splice(index, 1);
            localStorage.setItem('collectedItems', JSON.stringify(state.collected));
          },
    },
}