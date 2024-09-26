function utils(address?: string): string | undefined{

    if(address){
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    else {
        return undefined
    }
    // Rút gọn địa chỉ
    
}
export default utils