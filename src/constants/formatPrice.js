
export const formatPrice = (price) => {
    // Convert the price to a string
    const priceString = price.toString();

    // Split the price into two parts: integer and decimal
    const [integerPart, decimalPart] = priceString.split('.');

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer and decimal parts
    let formattedPrice = formattedIntegerPart;
    if (decimalPart) {
        formattedPrice += '.' + decimalPart;
    }

    // Add INR symbol at the beginning
    formattedPrice = '₹' + formattedPrice;

    return formattedPrice;
};