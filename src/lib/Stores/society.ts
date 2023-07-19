import { writable } from 'svelte/store'


export interface Society {
    open: boolean;
}
export const society = writable<Society>({
    open: false,
});