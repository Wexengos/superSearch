function getLabel(value: string): string {
    switch (value) {
        case 'Male':
            return "Masculino"
        case 'Female':
            return "Feminino"
        case 'good':
            return "Bom"
        case 'bad':
            return "Mau"
        case 'neutral':
            return "Neutro"
        default:
            return "Indefinido"
    }
}

export default getLabel;