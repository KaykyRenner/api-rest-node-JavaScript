const knex = require('../bancoDeDados/knexConfig')
const cidadesDePE = [
    "Recife",   
    "Olinda",
    "Jaboatão dos Guararapes",
    "Caruaru",
    "Petrolina",
    "Paulista",
    "Cabo de Santo Agostinho",
    "Igarassu",
    "Garanhuns",
    "Vitória de Santo Antão",
    "Goiana",
    "Arcoverde",
    "Gravatá",
    "Serra Talhada",
    "Santa Cruz do Capibaribe",
    "Pesqueira",
    "Palmares",
    "Ouricuri",
    "Afogados da Ingazeira",
    "Salgueiro",
    "São Lourenço da Mata",
    "Surubim",
    "Carpina",
    "Belo Jardim",
    "Timbaúba",
    "Escada",
    "Bezerros",
    "Camocim de São Félix",
    "Barreiros",
    "Bonito",
    "Limoeiro",
    "Araripina",
    "Lajedo",
    "São Bento do Una",
    "Tamandaré",
    "Itamaracá",
    "Fernando de Noronha",
    "Ipojuca",
    "Sirinhaém",
    "Lagoa do Carro",
    "Lagoa dos Gatos",
    "Panelas",
    "Palmeirina",
    "Bom Conselho",
    "Venturosa",
    "Águas Belas",
    "Cupira",
    "João Alfredo",
    "Brejo da Madre de Deus",
    "Gameleira",
    "São José do Egito",
    "Sertânia",
    "Custódia",
    "Triunfo",
    "Itapissuma",
    "Macaparana",
    "Catende",
    "Joaquim Nabuco",
    "Belém de Maria",
    "Água Preta",
    "Santa Maria da Boa Vista",
    "Ibimirim",
    "Aliança",
    "Buíque",
    "Tupanatinga",
    "Flores",
    "Poção",
    "Quipapá",
    "Santa Filomena",
    "Tabira",
    "Toritama",
    "Xexéu"
];
const seed = async () =>{
    const [{count}] = await knex('cidade').count('* as count')
    if(!Number.isInteger(count) || count > 0) return
    const cidadeInseridas = cidadesDePE.map(nomeCidade =>({nome:nomeCidade}))
    await knex('cidade').insert(cidadeInseridas)
}
module.exports = {seed}