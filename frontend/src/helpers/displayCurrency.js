const displayKSHCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-KE',{
        style : "currency",
        currency : 'KSH',
        minimumFractionDigit : 2
    })

    return formatter.format(num)
}

export default displayKSHCurrency