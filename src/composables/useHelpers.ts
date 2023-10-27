export function useHelpers() {
    const chunk = <T>(array: T[], chunkSize: number): any[] => {
        const length = Math.ceil(array.length / chunkSize)        
        const chunks = new Array(length).fill(0);
        return chunks.map((_, index) => {
            const start = index * chunkSize;
            const end = (index + 1) * chunkSize;
            return array.slice(start, end);
        })
    }

    const money = (amount: number): string => {
        const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'COP'});
        return numberFormat.format(amount)
    }

    return { chunk, money }
}