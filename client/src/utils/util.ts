export const calculateRate = (thumbUp: number, thumbDown: number): number => {
    return 5 * (thumbUp / (thumbUp + thumbDown));
};