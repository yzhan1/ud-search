export const calculateRate = (thumbUp: number, thumbDown: number) => {
    return 5 * (thumbUp / (thumbUp + thumbDown));
};