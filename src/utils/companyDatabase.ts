import { cleanDigits } from './formatters.ts';

export interface CompanySearchRecord {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  empresarios: string[]; // Nome do empresário / sócios principais / fundadores
  aliases?: string[]; // Sinônimos, marcas populares, nomes comerciais ou variações
  uf: string;
  municipio: string;
  segmento: string;
}

/**
 * Rich database of prominent Brazilian companies and entrepreneurs across various sectors.
 * Allows instant, zero-latency searching by Razão Social, Nome Fantasia, or Nome Completo do Empresário/Sócio.
 */
export const COMPANY_CATALOG: CompanySearchRecord[] = [
  // ==========================================
  // Varejo, E-commerce e Departamentos
  // ==========================================
  {
    cnpj: '47960950000121',
    razaoSocial: 'MAGAZINE LUIZA S.A.',
    nomeFantasia: 'MAGAZINE LUIZA / MAGALU',
    empresarios: ['Luiza Helena Trajano Inácio Rodrigues', 'Frederico Trajano Inácio Rodrigues', 'Marcelo José Ferreira e Silva'],
    uf: 'SP',
    municipio: 'Franca',
    segmento: 'Varejo e E-commerce',
  },
  {
    cnpj: '03007331000141',
    razaoSocial: 'MERCADOLIVRE.COM ATIVIDADES DE INTERNET LTDA.',
    nomeFantasia: 'MERCADO LIVRE',
    empresarios: ['Marcos Eduardo Galperin', 'Stelleo Tolda', 'Fernando Yunes'],
    uf: 'SP',
    municipio: 'Osasco',
    segmento: 'E-commerce e Tecnologia',
  },
  {
    cnpj: '92754738000162',
    razaoSocial: 'LOJAS RENNER S.A.',
    nomeFantasia: 'LOJAS RENNER',
    empresarios: ['Fabio Adegas Faccio', 'José Galló', 'Daniel Martinez dos Santos'],
    uf: 'RS',
    municipio: 'Porto Alegre',
    segmento: 'Moda e Varejo Têxtil',
  },
  {
    cnpj: '08402947000143',
    razaoSocial: 'LOJAS RIACHUELO S/A (GRUPO GUARARAPES)',
    nomeFantasia: 'RIACHUELO',
    empresarios: ['Flávio Gurgel Rocha', 'Nevaldo Rocha', 'André Farber'],
    uf: 'RN',
    municipio: 'Natal',
    segmento: 'Moda e Departamentos',
  },
  {
    cnpj: '11804364000140',
    razaoSocial: 'HAVAN S.A.',
    nomeFantasia: 'HAVAN',
    empresarios: ['Luciano Hang', 'Edson Hang', 'Nilton Hang'],
    uf: 'SC',
    municipio: 'Brusque',
    segmento: 'Varejo de Departamentos',
  },
  {
    cnpj: '00776574000156',
    razaoSocial: 'LOJAS AMERICANAS S.A. - EM RECUPERACAO JUDICIAL',
    nomeFantasia: 'AMERICANAS',
    empresarios: ['Jorge Paulo Lemann', 'Marcel Herrmann Telles', 'Carlos Alberto Sicupira', 'Leonardo Coelho Pereira'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Varejo',
  },
  {
    cnpj: '33041260065290',
    razaoSocial: 'VIA VAREJO S.A. (GRUPO CASAS BAHIA S.A.)',
    nomeFantasia: 'CASAS BAHIA / PONTO',
    empresarios: ['Renato Horta Franklin', 'Michael Klein', 'Elcio Ito'],
    uf: 'SP',
    municipio: 'São Caetano do Sul',
    segmento: 'Varejo de Eletrodomésticos',
  },
  {
    cnpj: '47508411000156',
    razaoSocial: 'COMPANHIA BRASILEIRA DE DISTRIBUICAO (GPA)',
    nomeFantasia: 'PAO DE ACUCAR / EXTRA',
    empresarios: ['Abilio dos Santos Diniz', 'Ronaldo Iabrudi', 'Marcelo Pimentel'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Supermercados e Alimentação',
  },
  {
    cnpj: '45543915000181',
    razaoSocial: 'ATACADAO S.A. (GRUPO CARREFOUR BRASIL)',
    nomeFantasia: 'ATACADAO / CARREFOUR',
    empresarios: ['Stéphane Maquaire', 'Marco Oliveira', 'David Geovanini'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Atacarejo e Alimentos',
  },
  {
    cnpj: '06057223000171',
    razaoSocial: 'SENDAS DISTRIBUIDORA S/A (ASSAI ATACADISTA)',
    nomeFantasia: 'ASSAI ATACADISTA',
    empresarios: ['Belmiro de Figueiredo Gomes', 'Welington Soares', 'Daniela Sabbag'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Atacarejo',
  },
  {
    cnpj: '16590234000176',
    razaoSocial: 'AREZZO INDUSTRIA E COMERCIO S.A. (AZZAS 2154)',
    nomeFantasia: 'AREZZO / SCHUTZ / RESERVA',
    empresarios: ['Alexandre Birman', 'Anderson Birman', 'Rony Meisler'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Calçados e Moda',
  },
  {
    cnpj: '06347409000165',
    razaoSocial: 'SBF COMERCIO DE PRODUTOS ESPORTIVOS LTDA',
    nomeFantasia: 'CENTAURO / NIKE BRASIL',
    empresarios: ['Sebastião Vicente Bomfim Filho', 'Pedro Zemel'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Artigos Esportivos',
  },
  {
    cnpj: '43708379000100',
    razaoSocial: 'FAST SHOP S.A.',
    nomeFantasia: 'FAST SHOP',
    empresarios: ['Kakumoto', 'Mário Kakumoto'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Eletroeletrônicos Premium',
  },
  {
    cnpj: '00436042000120',
    razaoSocial: 'POLISHOP COMERCIO E IMPORTACAO LTDA',
    nomeFantasia: 'POLISHOP',
    empresarios: ['João Appolinário', 'João Appolinário Neto'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Inovação e Varejo Multicanal',
  },
  {
    cnpj: '07117240000110',
    razaoSocial: 'SUPER VISOR EYEWEAR LTDA (CHILLI BEANS)',
    nomeFantasia: 'CHILLI BEANS',
    empresarios: ['Caito Maia', 'Renato Maia'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Óculos e Acessórios',
  },
  {
    cnpj: '04770138000123',
    razaoSocial: 'CACAU SHOW COMERCIO DE ALIMENTOS LTDA',
    nomeFantasia: 'CACAU SHOW',
    empresarios: ['Alexandre Tadeu da Costa'],
    uf: 'SP',
    municipio: 'Itapevi',
    segmento: 'Chocolates e Franquias',
  },
  {
    cnpj: '18328118000109',
    razaoSocial: 'PET CENTER COMERCIO E PARTICIPACOES S.A.',
    nomeFantasia: 'PETZ',
    empresarios: ['Sergio Zimerman', 'Aline Penna'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Pet Shop e Cuidados Animais',
  },
  {
    cnpj: '53153938000190',
    razaoSocial: 'EMPORIO DOS BICHOS COMERCIAL LTDA (COBASI)',
    nomeFantasia: 'COBASI',
    empresarios: ['Ricardo Nassar', 'Paulo Nassar', 'João Nassar'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Pet Shop e Jardinagem',
  },

  // ==========================================
  // Comunicação, Mídia e Entretenimento
  // ==========================================
  {
    cnpj: '43350131000101',
    razaoSocial: 'SILVIO SANTOS PARTICIPACOES S/A (GRUPO SILVIO SANTOS / SBT)',
    nomeFantasia: 'SBT / GRUPO SILVIO SANTOS / JEQUITI',
    empresarios: ['Silvio Santos (Senor Abravanel)', 'Daniela Beyruti', 'Patrícia Abravanel', 'Renata Abravanel'],
    uf: 'SP',
    municipio: 'Osasco',
    segmento: 'Televisão e Mídia',
  },
  {
    cnpj: '27865757000102',
    razaoSocial: 'GLOBO COMUNICACAO E PARTICIPACOES S.A.',
    nomeFantasia: 'TV GLOBO / GRUPO GLOBO',
    empresarios: ['João Roberto Marinho', 'Roberto Irineu Marinho', 'José Roberto Marinho', 'Roberto Marinho'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Televisão e Entretenimento',
  },
  {
    cnpj: '60628922000170',
    razaoSocial: 'RADIO E TELEVISAO RECORD S.A.',
    nomeFantasia: 'RECORD TV',
    empresarios: ['Edir Macedo Bezerra', 'Marcus Vinicius Vieira', 'Luiz Claudio Costa'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Televisão e Radiodifusão',
  },
  {
    cnpj: '60509239000113',
    razaoSocial: 'RADIO E TELEVISAO BANDEIRANTES S.A.',
    nomeFantasia: 'BAND / GRUPO BANDEIRANTES',
    empresarios: ['João Carlos Saad (Johnny Saad)', 'Ricardo Saad', 'Márcia Saad'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Televisão e Rádio',
  },
  {
    cnpj: '07738221000178',
    razaoSocial: 'ROCK WORLD S.A. (ROCK IN RIO / THE TOWN)',
    nomeFantasia: 'ROCK IN RIO',
    empresarios: ['Roberto Medina', 'Roberta Medina', 'Luis Justo'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Festivais e Entretenimento',
  },
  {
    cnpj: '13867623000149',
    razaoSocial: 'SMART FIT ESCOLA DE GINASTICA E DANCA S.A.',
    nomeFantasia: 'SMART FIT / BIO RITMO',
    empresarios: ['Edgard Corona', 'Diogo Corona', 'Thiago Borges'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Academias e Fitness',
  },

  // ==========================================
  // Bancos, Fintechs e Serviços Financeiros
  // ==========================================
  {
    cnpj: '00000000000191',
    razaoSocial: 'BANCO DO BRASIL SA',
    nomeFantasia: 'DIRECAO GERAL',
    empresarios: ['Tarciana Paula Gomes Medeiros', 'Rodrigo Mulinari', 'Ana Cristina Rosa Garcia'],
    uf: 'DF',
    municipio: 'Brasília',
    segmento: 'Bancos e Serviços Financeiros',
  },
  {
    cnpj: '30680829000143',
    razaoSocial: 'NU PAGAMENTOS S.A. - INSTITUICAO DE PAGAMENTO',
    nomeFantasia: 'NUBANK',
    empresarios: ['David Vélez Osorno', 'Cristina Junqueira', 'Edward Wible'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Fintech e Pagamentos',
  },
  {
    cnpj: '60701190000104',
    razaoSocial: 'ITAU UNIBANCO S.A.',
    nomeFantasia: 'ITAU',
    empresarios: ['Milton Maluhy Filho', 'Pedro Moreira Salles', 'Roberto Setubal', 'Candido Botelho Bracher'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Bancos',
  },
  {
    cnpj: '60746948000112',
    razaoSocial: 'BANCO BRADESCO S.A.',
    nomeFantasia: 'BRADESCO',
    empresarios: ['Marcelo de Araújo Noronha', 'Octavio de Lazari Junior', 'Luiz Carlos Trabuco Cappi'],
    uf: 'SP',
    municipio: 'Osasco',
    segmento: 'Bancos',
  },
  {
    cnpj: '90400888000142',
    razaoSocial: 'BANCO SANTANDER (BRASIL) S.A.',
    nomeFantasia: 'SANTANDER',
    empresarios: ['Mario Roberto Opice Leao', 'Sérgio Rial', 'Angel Santodomingo Martell'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Bancos',
  },
  {
    cnpj: '00360305000104',
    razaoSocial: 'CAIXA ECONOMICA FEDERAL',
    nomeFantasia: 'CAIXA',
    empresarios: ['Carlos Antônio Vieira Fernandes', 'Maria Rita Serrano', 'Inês da Silva Magalhães'],
    uf: 'DF',
    municipio: 'Brasília',
    segmento: 'Bancos Públicos',
  },
  {
    cnpj: '30724865000137',
    razaoSocial: 'BANCO INTER S.A.',
    nomeFantasia: 'BANCO INTER',
    empresarios: ['Rubens Menin Teixeira de Souza', 'João Vitor Menin', 'Alexandre Riccio de Oliveira'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Bancos Digitais',
  },
  {
    cnpj: '30306294000145',
    razaoSocial: 'BANCO BTG PACTUAL S.A.',
    nomeFantasia: 'BTG PACTUAL',
    empresarios: ['André Santos Esteves', 'Roberto Sallouti', 'Renato Monteiro dos Santos'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Banco de Investimentos',
  },
  {
    cnpj: '58160789000128',
    razaoSocial: 'BANCO SAFRA S/A',
    nomeFantasia: 'BANCO SAFRA',
    empresarios: ['David Safra', 'Alberto Safra', 'Vicky Safra', 'Joseph Safra'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Bancos e Wealth Management',
  },
  {
    cnpj: '02332886000104',
    razaoSocial: 'XP INVESTIMENTOS CORRETORA DE CAMBIO, TITULOS E VALORES MOBILIARIOS S.A.',
    nomeFantasia: 'XP INVESTIMENTOS',
    empresarios: ['Guilherme Dias Benchimol', 'Thiago Maffra', 'Gabriel Leal'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Corretora de Valores e Investimentos',
  },
  {
    cnpj: '16501555000157',
    razaoSocial: 'STONE INSTITUICAO DE PAGAMENTO S.A.',
    nomeFantasia: 'STONE PAGAMENTOS',
    empresarios: ['André Street de Aguiar', 'Eduardo Pontes', 'Pedro Franceschi'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Meios de Pagamento',
  },
  {
    cnpj: '08561701000101',
    razaoSocial: 'PAGSEGURO INTERNET S.A.',
    nomeFantasia: 'PAGBANK / PAGSEGURO',
    empresarios: ['Luiz Frias', 'Alexandre Magnani', 'Ricardo Dutra'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Meios de Pagamento',
  },
  {
    cnpj: '01027058000191',
    razaoSocial: 'CIELO S.A. - INSTITUICAO DE PAGAMENTO',
    nomeFantasia: 'CIELO',
    empresarios: ['Estanislau Bassols', 'Filipe Oliveira'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Adquirência e Pagamentos',
  },
  {
    cnpj: '22896431000110',
    razaoSocial: 'PICPAY INSTITUICAO DE PAGAMENTO S.A.',
    nomeFantasia: 'PICPAY',
    empresarios: ['José Antônio Batista', 'Anderson Chamon', 'Eduardo Chedid'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Carteiras Digitais',
  },
  {
    cnpj: '31872495000172',
    razaoSocial: 'BANCO C6 S.A.',
    nomeFantasia: 'C6 BANK',
    empresarios: ['Marcelo Kalim', 'Leandro Torres', 'Luiz Marcelo Calicchio'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Bancos Digitais',
  },
  {
    cnpj: '09346601000125',
    razaoSocial: 'B3 S.A. - BRASIL, BOLSA, BALCAO',
    nomeFantasia: 'B3 / BOLSA DE VALORES',
    empresarios: ['Gilson Finkelsztain', 'André Veiga Milanez'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Mercado Financeiro e Bolsa',
  },

  // ==========================================
  // Energia, Petróleo, Mineração e Siderurgia
  // ==========================================
  {
    cnpj: '33000167000101',
    razaoSocial: 'PETROLEO BRASILEIRO S.A. - PETROBRAS',
    nomeFantasia: 'PETROBRAS',
    empresarios: ['Magda Chambriard', 'Jean Paul Prates', 'Clarice Coppetti', 'Fernando Melgarejo'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Petróleo e Gás',
  },
  {
    cnpj: '33592510000154',
    razaoSocial: 'VALE S.A.',
    nomeFantasia: 'VALE',
    empresarios: ['Gustavo Pimenta', 'Eduardo Bartolomeo', 'Murilo Ferreira'],
    aliases: ['Companhia Vale do Rio Doce', 'CVRD', 'Vale do Rio Doce', 'Mineradora Vale'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Mineração e Metalurgia',
  },
  {
    cnpj: '84429695000111',
    razaoSocial: 'WEG EQUIPAMENTOS ELETRICOS S.A.',
    nomeFantasia: 'WEG',
    empresarios: ['Alberto Yoshikazu Kuba', 'Harry Schmelzer Jr.', 'Décio da Silva', 'Werner Ricardo Voigt'],
    uf: 'SC',
    municipio: 'Jaraguá do Sul',
    segmento: 'Motores e Equipamentos Elétricos',
  },
  {
    cnpj: '33611500000119',
    razaoSocial: 'GERDAU S.A.',
    nomeFantasia: 'GERDAU',
    empresarios: ['Gustavo Werneck da Cunha', 'André Bier Gerdau Johannpeter', 'Claudio Johannpeter'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Siderurgia e Aço',
  },
  {
    cnpj: '33042730000104',
    razaoSocial: 'COMPANHIA SIDERURGICA NACIONAL (CSN)',
    nomeFantasia: 'CSN',
    empresarios: ['Benjamin Steinbruch', 'Enéas Garcia Diniz'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Siderurgia e Mineração',
  },
  {
    cnpj: '07689002000189',
    razaoSocial: 'EMBRAER S.A.',
    nomeFantasia: 'EMBRAER',
    empresarios: ['Francisco Gomes Neto', 'Antonio Carlos Garcia', 'Alexandre Figueiredo'],
    uf: 'SP',
    municipio: 'São José dos Campos',
    segmento: 'Aeroespacial e Defesa',
  },
  {
    cnpj: '08070508000178',
    razaoSocial: 'RAIZEN S.A.',
    nomeFantasia: 'RAIZEN',
    empresarios: ['Rubens Ometto Silveira Mello', 'Ricardo Mussa', 'Nelson Roseira Gomes Neto'],
    uf: 'SP',
    municipio: 'Piracicaba',
    segmento: 'Etanol e Combustíveis',
  },
  {
    cnpj: '50746577000115',
    razaoSocial: 'COSAN S.A.',
    nomeFantasia: 'GRUPO COSAN',
    empresarios: ['Rubens Ometto Silveira Mello', 'Marcelo Eduardo Martins', 'Luis Henrique Guimarães'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Agronegócio e Logística',
  },
  {
    cnpj: '00001180000126',
    razaoSocial: 'CENTRAIS ELETRICAS BRASILEIRAS S.A. - ELETROBRAS',
    nomeFantasia: 'ELETROBRAS',
    empresarios: ['Ivan de Souza Monteiro', 'Wilson Ferreira Junior', 'Elvira Cavalcanti Presta'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Energia Elétrica',
  },
  {
    cnpj: '16404287000155',
    razaoSocial: 'SUZANO S.A.',
    nomeFantasia: 'SUZANO PAPEL E CELULOSE',
    empresarios: ['David Feffer', 'Beto Abreu', 'Walter Schalka'],
    uf: 'BA',
    municipio: 'Salvador',
    segmento: 'Papel e Celulose',
  },
  {
    cnpj: '89637490000145',
    razaoSocial: 'KLABIN S.A.',
    nomeFantasia: 'KLABIN',
    empresarios: ['Cristiano Teixeira', 'Armando Klabin', 'Marcos Paulo Conde'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Papel e Embalagens',
  },
  {
    cnpj: '03407049000151',
    razaoSocial: 'VOTORANTIM S.A.',
    nomeFantasia: 'GRUPO VOTORANTIM',
    empresarios: ['Antônio Ermírio de Moraes', 'José Roberto Ermírio de Moraes', 'João Schmidt'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Cimento e Metais',
  },

  // ==========================================
  // Bebidas, Alimentos e Agronegócio
  // ==========================================
  {
    cnpj: '56994502000130',
    razaoSocial: 'AMBEV S.A.',
    nomeFantasia: 'AMBEV',
    empresarios: ['Jorge Paulo Lemann', 'Marcel Herrmann Telles', 'Carlos Alberto Sicupira', 'Jean Jereissati Neto'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Bebidas e Cervejarias',
  },
  {
    cnpj: '02916265000100',
    razaoSocial: 'JBS S/A',
    nomeFantasia: 'FRIBOI / SEARA / JBS',
    empresarios: ['Joesley Mendonça Batista', 'Wesley Mendonça Batista', 'Gilberto Tomazoni', 'José Batista Sobrinho'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Alimentos e Frigoríficos',
  },
  {
    cnpj: '01838723000127',
    razaoSocial: 'BRF S.A.',
    nomeFantasia: 'SADIA / PERDIGAO / BRF',
    empresarios: ['Marcos Antonio Molina dos Santos', 'Miguel de Souza Gularte', 'Marcos Roberto Badialli'],
    uf: 'SC',
    municipio: 'Itajaí',
    segmento: 'Alimentos e Avicultura',
  },
  {
    cnpj: '03853896000140',
    razaoSocial: 'MARFRIG GLOBAL FOODS S.A.',
    nomeFantasia: 'MARFRIG',
    empresarios: ['Marcos Antonio Molina dos Santos', 'Rui Mendonça'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Carne Bovina e Alimentos',
  },
  {
    cnpj: '61064838000100',
    razaoSocial: 'M. DIAS BRANCO S.A. INDUSTRIA E COMERCIO DE ALIMENTOS',
    nomeFantasia: 'VITARELLA / PIRAQUE / ADMIC',
    empresarios: ['Ivens Dias Branco Junior', 'Geraldo Luciano Mattos Junior', 'Maria Regina Saraiva Leão Dias Branco'],
    uf: 'CE',
    municipio: 'Eusébio',
    segmento: 'Alimentos e Massas',
  },
  {
    cnpj: '64904295000103',
    razaoSocial: 'CAMIL ALIMENTOS S.A.',
    nomeFantasia: 'CAMIL / UNIAO / COQUEIRO',
    empresarios: ['Luciano Quartiero', 'Jairo Quartiero'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Grãos e Alimentos Básicos',
  },
  {
    cnpj: '17616641000117',
    razaoSocial: 'TRES CORACOES ALIMENTOS S.A.',
    nomeFantasia: 'CAFE 3 CORACOES',
    empresarios: ['Pedro Lima', 'Paulo Lima', 'Vicente Lima'],
    uf: 'MG',
    municipio: 'Santa Luzia',
    segmento: 'Café e Bebidas',
  },

  // ==========================================
  // Saúde, Farmacêutica e Cosméticos
  // ==========================================
  {
    cnpj: '16619378000108',
    razaoSocial: 'CIMED & CO S.A. (CIMED INDUSTRIA DE MEDICAMENTOS)',
    nomeFantasia: 'CIMED / CARMED',
    empresarios: ['João Adibe Marques', 'Karla Marques Felmanas', 'João de Castro Marques'],
    uf: 'MG',
    municipio: 'Pouso Alegre',
    segmento: 'Indústria Farmacêutica',
  },
  {
    cnpj: '57507378000101',
    razaoSocial: 'EMS S/A (GRUPO NC)',
    nomeFantasia: 'EMS FARMACEUTICA',
    empresarios: ['Carlos Sanchez', 'Leonardo Sanchez'],
    uf: 'SP',
    municipio: 'Hortolândia',
    segmento: 'Medicamentos Genéricos',
  },
  {
    cnpj: '61190096000192',
    razaoSocial: 'EUROFARMA LABORATORIOS S.A.',
    nomeFantasia: 'EUROFARMA',
    empresarios: ['Maurizio Billi', 'Maria Del Pilar Billi'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Indústria Farmacêutica',
  },
  {
    cnpj: '04382836000118',
    razaoSocial: 'HYPERA S.A. (HYPERMARCAS / NEO QUIMICA)',
    nomeFantasia: 'NEO QUIMICA / ENGOV / BENEGRIP',
    empresarios: ['João Alves de Queiroz Filho (Binho)', 'Breno de Carvalho Oliveira'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Farmacêutica e Cuidados',
  },
  {
    cnpj: '61585865000151',
    razaoSocial: 'RAIA DROGASIL S/A (RD SAUDE)',
    nomeFantasia: 'DROGA RAIA / DROGASIL',
    empresarios: ['Marcilio D Amico Pousada', 'Antonio Carlos Pipponzi'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Farmácias e Saúde',
  },
  {
    cnpj: '61412110000155',
    razaoSocial: 'DROGARIA SAO PAULO S.A. (GRUPO DPSP)',
    nomeFantasia: 'DROGARIA SAO PAULO / DROGARIAS PACHECO',
    empresarios: ['Samuel Barata', 'Marcus Barata'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Farmácias',
  },
  {
    cnpj: '71673990000177',
    razaoSocial: 'NATURA COSMETICOS S/A',
    nomeFantasia: 'NATURA',
    empresarios: ['Luiz da Silva Seabra', 'Guilherme Peirão Leal', 'Pedro Luiz Barreiros Passos', 'Fábio Barbosa'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Cosméticos e Perfumaria',
  },
  {
    cnpj: '77388007000157',
    razaoSocial: 'BOTICARIO PRODUTOS DE BELEZA LTDA',
    nomeFantasia: 'O BOTICARIO / QUEM DISSE BERENICE',
    empresarios: ['Miguel Krigsner', 'Artur Noemio Grynbaum', 'Fernando Modé'],
    uf: 'PR',
    municipio: 'São José dos Pinhais',
    segmento: 'Cosméticos e Beleza',
  },
  {
    cnpj: '06047087000139',
    razaoSocial: 'REDE D OR SAO LUIZ S.A.',
    nomeFantasia: 'REDE D OR',
    empresarios: ['Jorge Neval Moll Filho', 'Paulo Junqueira Moll', 'Pedro de Godoy Bueno'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Hospitais e Saúde',
  },
  {
    cnpj: '63554067000198',
    razaoSocial: 'HAPVIDA PARTICIPACOES E INVESTIMENTOS S/A',
    nomeFantasia: 'HAPVIDA NOTREDAME INTERMEDICA',
    empresarios: ['Candido Pinheiro Koren de Lima', 'Jorge Pinheiro Koren de Lima', 'Candido Pinheiro Junior'],
    uf: 'CE',
    municipio: 'Fortaleza',
    segmento: 'Planos de Saúde e Hospitais',
  },
  {
    cnpj: '61486650000183',
    razaoSocial: 'DIAGNOSTICOS DA AMERICA S.A. (DASA)',
    nomeFantasia: 'DASA / DELBONI / LAVOISIER',
    empresarios: ['Dulce Pugliese de Godoy Bueno', 'Pedro de Godoy Bueno', 'Lício Cintra'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Medicina Diagnóstica',
  },
  {
    cnpj: '60840055000131',
    razaoSocial: 'FLEURY S.A.',
    nomeFantasia: 'GRUPO FLEURY',
    empresarios: ['Jeane Tsutsui', 'Márcio Mendes'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Laboratórios e Diagnóstico',
  },
  {
    cnpj: '60765823000130',
    razaoSocial: 'SOCIEDADE BENEFICENTE ISRAELITA BRASILEIRA HOSPITAL ALBERT EINSTEIN',
    nomeFantasia: 'HOSPITAL ALBERT EINSTEIN',
    empresarios: ['Sidney Klajner', 'Claudio Lottenberg'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Hospital Geral',
  },
  {
    cnpj: '61590410000124',
    razaoSocial: 'SOCIEDADE BENEFICENTE DE SENHORAS HOSPITAL SIRIO-LIBANES',
    nomeFantasia: 'HOSPITAL SIRIO-LIBANES',
    empresarios: ['Fernando Ganem', 'Paulo Chapchap'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Hospital e Oncologia',
  },

  // ==========================================
  // Tecnologia, Telecom e Serviços
  // ==========================================
  {
    cnpj: '53113791000122',
    razaoSocial: 'TOTVS S.A.',
    nomeFantasia: 'TOTVS',
    empresarios: ['Laércio José de Lucena Cosentino', 'Dennis Herszkowicz', 'Gilsinei Valdir Hansen'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Software de Gestão (ERP)',
  },
  {
    cnpj: '58069360000119',
    razaoSocial: 'STEFANINI CONSULTORIA EM INFORMATICA S.A.',
    nomeFantasia: 'STEFANINI GROUP',
    empresarios: ['Marco Stefanini', 'Maria Thaner Stefanini'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Tecnologia da Informação',
  },
  {
    cnpj: '06990590000123',
    razaoSocial: 'GOOGLE BRASIL INTERNET LTDA.',
    nomeFantasia: 'GOOGLE BRASIL',
    empresarios: ['Fabio José Silva Coelho', 'Paula Bellizia', 'Sundar Pichai'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Tecnologia e Internet',
  },
  {
    cnpj: '15436940000103',
    razaoSocial: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
    nomeFantasia: 'AMAZON BRASIL',
    empresarios: ['Daniel Mazini', 'Andy Jassy', 'Jeffrey Bezos'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'E-commerce e Nuvem (AWS)',
  },
  {
    cnpj: '38366050000140',
    razaoSocial: 'SHPS TECNOLOGIA E SERVICOS LTDA. (SHOPEE)',
    nomeFantasia: 'SHOPEE BRASIL',
    empresarios: ['Felipe Piringer', 'Forrest Li'],
    aliases: ['Shopee', 'Shopee Brasil', 'Sea Group'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Marketplace e E-commerce',
  },
  {
    cnpj: '14380200000121',
    razaoSocial: 'IFOOD.COM AGENCIA DE RESTAURANTES ONLINE S.A.',
    nomeFantasia: 'IFOOD',
    empresarios: ['Fabricio Bloisi', 'Diego Barreto', 'Arnaldo Rocha'],
    aliases: ['iFood', 'iFood Brasil', 'Ifood Restaurantes', 'Movile', 'Entrega iFood'],
    uf: 'SP',
    municipio: 'Osasco',
    segmento: 'Delivery de Refeições e Tecnologia',
  },
  {
    cnpj: '17895646000187',
    razaoSocial: 'UBER DO BRASIL TECNOLOGIA LTDA.',
    nomeFantasia: 'UBER',
    empresarios: ['Dara Khosrowshahi', 'Silvia Penna'],
    aliases: ['Uber', 'Uber Brasil', 'Uber Tecnologia', 'Uber Viagens'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Mobilidade Urbana e Tecnologia',
  },
  {
    cnpj: '18033552000161',
    razaoSocial: '99 TECNOLOGIA LTDA.',
    nomeFantasia: '99 / 99APP',
    empresarios: ['Paulo Veras', 'Renato Freitas', 'Ariel Lambrecht'],
    aliases: ['99', '99 App', '99 Táxi', '99 Pop', 'DiDi Chuxing'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Mobilidade Urbana e Tecnologia',
  },
  {
    cnpj: '00623904000173',
    razaoSocial: 'APPLE COMPUTER BRASIL LTDA',
    nomeFantasia: 'APPLE BRASIL',
    empresarios: ['Tim Cook', 'Steve Jobs'],
    aliases: ['Apple', 'Apple Brasil', 'Apple Inc', 'iPhone', 'iPad', 'MacBook'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Eletrônicos e Tecnologia',
  },
  {
    cnpj: '60316817000103',
    razaoSocial: 'MICROSOFT INFORMATICA LTDA',
    nomeFantasia: 'MICROSOFT BRASIL',
    empresarios: ['Satya Nadella', 'Bill Gates'],
    aliases: ['Microsoft', 'Microsoft Brasil', 'Windows', 'Xbox', 'Azure Brasil'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Software, Nuvem e Computação',
  },
  {
    cnpj: '42591651000143',
    razaoSocial: 'ARCOS DOURADOS COMERCIO DE ALIMENTOS SA (MCDONALD S)',
    nomeFantasia: 'MCDONALDS / MC DONALDS / MEQUI',
    empresarios: ['Woods Staton', 'Marcelo Rabach', 'Paulo Camargo'],
    aliases: ['McDonalds', 'Mc Donalds', 'Méqui', 'Arcos Dorados', 'Arcos Dourados'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Restaurantes e Fast Food',
  },
  {
    cnpj: '13574594000196',
    razaoSocial: 'ZAMP S.A. (BURGER KING E POPEYES)',
    nomeFantasia: 'BURGER KING / POPEYES',
    empresarios: ['Iuri Miranda', 'Ariel Grunkraut'],
    aliases: ['Burger King', 'Burger King Brasil', 'BK Brasil', 'Popeyes Brasil', 'Zamp'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Restaurantes e Fast Food',
  },
  {
    cnpj: '01438784000105',
    razaoSocial: 'BRICOLAGEM BRASIL LTDA (LEROY MERLIN)',
    nomeFantasia: 'LEROY MERLIN',
    empresarios: ['Ignacio Sanchez', 'François Mulliez'],
    aliases: ['Leroy Merlin', 'Leroy Merlin Brasil', 'Grupo Adeo', 'Home Center'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Construção, Acabamento e Decoração',
  },
  {
    cnpj: '43283811000150',
    razaoSocial: 'KALUNGA S.A.',
    nomeFantasia: 'KALUNGA',
    empresarios: ['Paulo Garcia', 'Silvio Garcia'],
    aliases: ['Kalunga', 'Papelaria Kalunga', 'Kalunga Comércio'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Papelaria, Material de Escritório e Informática',
  },
  {
    cnpj: '16788643000181',
    razaoSocial: 'QUINTO ANDAR SERVICOS IMOBILIARIOS LTDA.',
    nomeFantasia: 'QUINTOANDAR',
    empresarios: ['Gabriel Braga', 'André Penha'],
    aliases: ['Quinto Andar', 'QuintoAndar Imóveis', 'Aluguel QuintoAndar'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Imobiliário e Proptech',
  },
  {
    cnpj: '35985834000105',
    razaoSocial: 'SHEIN BRASIL TECNOLOGIA DA INFORMACAO LTDA.',
    nomeFantasia: 'SHEIN BRASIL',
    empresarios: ['Chris Xu', 'Marcelo Claure'],
    aliases: ['Shein', 'Shein Brasil', 'Moda Shein'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Moda e E-commerce',
  },
  {
    cnpj: '02558157000162',
    razaoSocial: 'TELEFONICA BRASIL S.A.',
    nomeFantasia: 'VIVO',
    empresarios: ['Christian Mauad Gebara', 'David Melcon Sanchez-Friera'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Telecomunicações e Internet',
  },
  {
    cnpj: '02421421000111',
    razaoSocial: 'TIM S.A.',
    nomeFantasia: 'TIM BRASIL',
    empresarios: ['Alberto Mario Griselli', 'Pietro Labriola'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Telecomunicações',
  },
  {
    cnpj: '40432544000147',
    razaoSocial: 'CLARO S.A.',
    nomeFantasia: 'CLARO / NET / EMBRATEL',
    empresarios: ['Paulo César Manuel Teixeira', 'Carlos Slim Helú'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Telecomunicações',
  },

  // ==========================================
  // Transporte, Aviação e Mobilidade
  // ==========================================
  {
    cnpj: '16670085000155',
    razaoSocial: 'LOCALIZA RENT A CAR S.A.',
    nomeFantasia: 'LOCALIZA HERTZ / UNIDAS',
    empresarios: ['Salim Mattar', 'Eugênio Mattar', 'Bruno Lasansky'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Locação de Veículos',
  },
  {
    cnpj: '07976147000160',
    razaoSocial: 'MOVIDA LOCACAO DE VEICULOS S.A. (GRUPO SIMPAR)',
    nomeFantasia: 'MOVIDA',
    empresarios: ['Fernando Antônio Simões', 'Renato Horta Franklin'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Aluguel de Carros',
  },
  {
    cnpj: '09296295000160',
    razaoSocial: 'AZUL LINHAS AEREAS BRASILEIRAS S.A.',
    nomeFantasia: 'AZUL',
    empresarios: ['David Neeleman', 'John Peter Rodgerson', 'Alexandre Malfitani'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Transporte Aéreo',
  },
  {
    cnpj: '07575651000159',
    razaoSocial: 'GOL LINHAS AEREAS S.A. - EM RECUPERACAO JUDICIAL',
    nomeFantasia: 'GOL LINHAS AEREAS',
    empresarios: ['Nenê Constantino', 'Constantino de Oliveira Junior', 'Celso Guimarães Ferrer Silva'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Transporte Aéreo',
  },
  {
    cnpj: '13508082000159',
    razaoSocial: 'RUMO S.A.',
    nomeFantasia: 'RUMO LOGISTICA',
    empresarios: ['Rubens Ometto Silveira Mello', 'Pedro Palma', 'Beto Abreu'],
    uf: 'PR',
    municipio: 'Curitiba',
    segmento: 'Ferrovias e Logística',
  },

  // ==========================================
  // Construção Civil e Imobiliário
  // ==========================================
  {
    cnpj: '08343492000120',
    razaoSocial: 'MRV ENGENHARIA E PARTICIPACOES S.A.',
    nomeFantasia: 'MRV',
    empresarios: ['Rubens Menin Teixeira de Souza', 'Rafael Menin Teixeira de Souza', 'Eduardo Fischer Teixeira de Souza'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Construção Residencial',
  },
  {
    cnpj: '73178600000118',
    razaoSocial: 'CYRELA BRAZIL REALTY S.A. EMPREENDIMENTOS E PARTICIPACOES',
    nomeFantasia: 'CYRELA',
    empresarios: ['Elie Horn', 'Efraim Horn', 'Raphael Horn'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Incorporação e Construção',
  },
  // ==========================================
  // Saneamento, Energia e Concessões Públicas
  // ==========================================
  {
    cnpj: '43776517000180',
    razaoSocial: 'COMPANHIA DE SANEAMENTO BASICO DO ESTADO DE SAO PAULO - SABESP',
    nomeFantasia: 'SABESP',
    empresarios: ['André Salcedo', 'Governo do Estado de São Paulo'],
    aliases: ['SABESP SANEAMENTO', 'SABESP AGUA E ESGOTO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Água e Saneamento',
  },
  {
    cnpj: '76483817000120',
    razaoSocial: 'COMPANHIA PARANAENSE DE ENERGIA - COPEL',
    nomeFantasia: 'COPEL',
    empresarios: ['Daniel Pimentel Slaviero'],
    aliases: ['COPEL ENERGIA', 'COPEL DISTRIBUICAO'],
    uf: 'PR',
    municipio: 'Curitiba',
    segmento: 'Energia Elétrica',
  },
  {
    cnpj: '17155730000164',
    razaoSocial: 'COMPANHIA ENERGETICA DE MINAS GERAIS - CEMIG',
    nomeFantasia: 'CEMIG',
    empresarios: ['Reynaldo Passanezi Filho'],
    aliases: ['CEMIG ENERGIA', 'CEMIG DISTRIBUICAO'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Energia Elétrica',
  },
  {
    cnpj: '03220438000173',
    razaoSocial: 'EQUATORIAL ENERGIA S.A.',
    nomeFantasia: 'EQUATORIAL ENERGIA',
    empresarios: ['Augusto Miranda da Paz Junior'],
    aliases: ['EQUATORIAL', 'GRUPO EQUATORIAL'],
    uf: 'DF',
    municipio: 'Brasília',
    segmento: 'Energia e Saneamento',
  },
  {
    cnpj: '02429144000193',
    razaoSocial: 'CPFL ENERGIA S.A.',
    nomeFantasia: 'CPFL ENERGIA',
    empresarios: ['Gustavo Estrella'],
    aliases: ['CPFL', 'CPFL PAULISTA'],
    uf: 'SP',
    municipio: 'Campinas',
    segmento: 'Energia Elétrica',
  },
  {
    cnpj: '01083200000118',
    razaoSocial: 'NEOENERGIA S.A.',
    nomeFantasia: 'NEOENERGIA',
    empresarios: ['Eduardo Capelastegui Saiz'],
    aliases: ['NEOENERGIA ELEKTRO', 'NEOENERGIA COELBA'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Energia Elétrica',
  },
  {
    cnpj: '76484013000145',
    razaoSocial: 'COMPANHIA DE SANEAMENTO DO PARANA - SANEPAR',
    nomeFantasia: 'SANEPAR',
    empresarios: ['Claudio Stabile'],
    aliases: ['SANEPAR SANEAMENTO'],
    uf: 'PR',
    municipio: 'Curitiba',
    segmento: 'Água e Saneamento',
  },
  {
    cnpj: '17281106000103',
    razaoSocial: 'COMPANHIA DE SANEAMENTO DE MINAS GERAIS - COPASA',
    nomeFantasia: 'COPASA',
    empresarios: ['Guilherme Augusto Duarte de Faria'],
    aliases: ['COPASA SANEAMENTO'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Água e Saneamento',
  },
  {
    cnpj: '02474103000119',
    razaoSocial: 'ENGIE BRASIL ENERGIA S.A.',
    nomeFantasia: 'ENGIE BRASIL',
    empresarios: ['Eduardo Takamori', 'Mauricio Bähr'],
    aliases: ['ENGIE', 'TRACTEBEL'],
    uf: 'SC',
    municipio: 'Florianópolis',
    segmento: 'Geração de Energia',
  },
  {
    cnpj: '07523555000167',
    razaoSocial: 'ENEL BRASIL S.A.',
    nomeFantasia: 'ENEL BRASIL',
    empresarios: ['Antonio Scala'],
    aliases: ['ENEL', 'ENEL SAO PAULO', 'ENEL RIO'],
    uf: 'RJ',
    municipio: 'Niterói',
    segmento: 'Energia Elétrica',
  },
  // ==========================================
  // Alimentos, Bebidas e Redes de Franquias
  // ==========================================
  {
    cnpj: '05897077000168',
    razaoSocial: 'CACAU SHOW COMERCIO DE ALIMENTOS LTDA.',
    nomeFantasia: 'CACAU SHOW',
    empresarios: ['Alexandre Tadeu da Costa'],
    aliases: ['CACAU SHOW CHOCOLATES', 'ALEXANDRE COSTA'],
    uf: 'SP',
    municipio: 'Itapevi',
    segmento: 'Chocolates e Confeitaria',
  },
  {
    cnpj: '61119509000189',
    razaoSocial: 'CRM DISTRIBUIDORA DE ALIMENTOS S.A.',
    nomeFantasia: 'KOPENHAGEN / BRASIL CACAU',
    empresarios: ['Renata Moraes Vichi', 'Celso Ricardo de Moraes'],
    aliases: ['KOPENHAGEN', 'BRASIL CACAU', 'GRUPO CRM'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Chocolates Finos',
  },
  {
    cnpj: '60409075000152',
    razaoSocial: 'PANDURATA ALIMENTOS LTDA. - BAUDUCCO',
    nomeFantasia: 'BAUDUCCO',
    empresarios: ['Carlo Bauducco', 'Massimo Bauducco'],
    aliases: ['BAUDUCCO PANETTONES', 'PANDURATA'],
    uf: 'SP',
    municipio: 'Guarulhos',
    segmento: 'Panificação e Biscoitos',
  },
  {
    cnpj: '60108776000170',
    razaoSocial: 'ALSAR RESTAURANTES LTDA. (HABIB\'S)',
    nomeFantasia: 'HABIB\'S / RAGAZZO',
    empresarios: ['Antônio Alberto Saraiva'],
    aliases: ['HABIBS', 'HABIB S', 'RAGAZZO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Rede de Restaurantes Fast Food',
  },
  {
    cnpj: '12383663000150',
    razaoSocial: 'MADERO INDUSTRIA E COMERCIO S.A.',
    nomeFantasia: 'MADERO / JERONIMO',
    empresarios: ['Luiz Renato Durski Junior (Junior Durski)'],
    aliases: ['MADERO', 'JERONIMO BURGER', 'GRUPO MADERO'],
    uf: 'PR',
    municipio: 'Curitiba',
    segmento: 'Restaurantes e Hamburguerias',
  },
  {
    cnpj: '05513754000135',
    razaoSocial: 'COCO BAMBU RESTAURANTES LTDA.',
    nomeFantasia: 'COCO BAMBU',
    empresarios: ['Afrânio Barreira', 'Daniela Barreira'],
    aliases: ['COCO BAMBU FRUTOS DO MAR'],
    uf: 'CE',
    municipio: 'Fortaleza',
    segmento: 'Restaurantes e Gastronomia',
  },
  {
    cnpj: '02040644000135',
    razaoSocial: 'BLOOMIN\' BRANDS BRASIL RESTAURANTES LTDA.',
    nomeFantasia: 'OUTBACK STEAKHOUSE / ABBRACCIO',
    empresarios: ['Pierre Berenstein', 'Mauro Guardabassi'],
    aliases: ['OUTBACK', 'OUTBACK BRASIL', 'ABBRACCIO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Restaurantes Casual Dining',
  },
  {
    cnpj: '04288742000190',
    razaoSocial: 'DINIZ FRANCHISING LTDA. (OTICAS DINIZ)',
    nomeFantasia: 'OTICAS DINIZ',
    empresarios: ['Arione Diniz'],
    aliases: ['OTICA DINIZ', 'OTICAS DINIZ BRASIL'],
    uf: 'SP',
    municipio: 'São José do Rio Preto',
    segmento: 'Óticas e Varejo de Óculos',
  },
  {
    cnpj: '04899316000108',
    razaoSocial: 'ULTRAFARMA SAUDE LTDA.',
    nomeFantasia: 'ULTRAFARMA',
    empresarios: ['Sidney Oliveira'],
    aliases: ['ULTRAFARMA SIDNEY OLIVEIRA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Farmácias e Medicamentos',
  },
  {
    cnpj: '06626253000151',
    razaoSocial: 'EMPREENDIMENTOS PAGUE MENOS S/A',
    nomeFantasia: 'FARMACIAS PAGUE MENOS / EXTRAFARMA',
    empresarios: ['Deusmar Queirós', 'Mário Queirós'],
    aliases: ['PAGUE MENOS', 'FARMACIA PAGUE MENOS', 'EXTRAFARMA'],
    uf: 'CE',
    municipio: 'Fortaleza',
    segmento: 'Farmácias e Drogarias',
  },
  {
    cnpj: '92693025000103',
    razaoSocial: 'DIMED S/A DISTRIBUIDORA DE MEDICAMENTOS - PANVEL',
    nomeFantasia: 'PANVEL FARMACIAS',
    empresarios: ['Julio Ricardo Mottin Neto'],
    aliases: ['PANVEL', 'GRUPO DIMED'],
    uf: 'RS',
    municipio: 'Eldorado do Sul',
    segmento: 'Farmácias e Cosméticos',
  },
  {
    cnpj: '00461479000163',
    razaoSocial: 'PREVENT SENIOR PRIVATE OPERADORA DE SAUDE LTDA.',
    nomeFantasia: 'PREVENT SENIOR',
    empresarios: ['Fernando Parrillo', 'Eduardo Parrillo'],
    aliases: ['PREVENT SENIOR PLANO DE SAUDE'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Operadora de Saúde e Hospitais',
  },
  {
    cnpj: '44408383000161',
    razaoSocial: 'UNIMED DO BRASIL CONFEDERACAO NACIONAL DAS COOPERATIVAS MEDICAS',
    nomeFantasia: 'UNIMED DO BRASIL',
    empresarios: ['Omar Abujamra Junior'],
    aliases: ['UNIMED', 'SISTEMA UNIMED', 'CENTRAL NACIONAL UNIMED'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Planos de Saúde e Cooperativas Médicas',
  },
  // ==========================================
  // Tecnologia, Telecom e Serviços Digitais
  // ==========================================
  {
    cnpj: '71208516000174',
    razaoSocial: 'ALGAR TELECOM S.A.',
    nomeFantasia: 'ALGAR TELECOM',
    empresarios: ['Luiz Alexandre Garcia', 'Jean Carlos Borges'],
    aliases: ['ALGAR', 'CTBC'],
    uf: 'MG',
    municipio: 'Uberlândia',
    segmento: 'Telecomunicações e TI',
  },
  {
    cnpj: '00781082000183',
    razaoSocial: 'CI&T SOFTWARE S.A.',
    nomeFantasia: 'CI&T',
    empresarios: ['Cesar Gon', 'Bruno Guicardi', 'Fernando Martins'],
    aliases: ['CIT', 'CI E T'],
    uf: 'SP',
    municipio: 'Campinas',
    segmento: 'Transformação Digital e Software',
  },
  {
    cnpj: '02351877000152',
    razaoSocial: 'LWSA S.A. (ANTIGA LOCAWEB)',
    nomeFantasia: 'LOCAWEB / LWSA',
    empresarios: ['Gilberto Mautner', 'Claudio Gora', 'Fernando Cirne'],
    aliases: ['LOCAWEB', 'LWSA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Hospedagem e Soluções Digitais',
  },
  {
    cnpj: '27604288000120',
    razaoSocial: 'BUSER BRASIL TECNOLOGIA LTDA.',
    nomeFantasia: 'BUSER',
    empresarios: ['Marcelo Abritta', 'Marcelo Vasconcellos'],
    aliases: ['BUSER ONIBUS', 'BUSER VIAGENS'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Transporte e Plataforma Digital',
  },
  {
    cnpj: '03563689000123',
    razaoSocial: 'DECOLAR.COM LTDA.',
    nomeFantasia: 'DECOLAR',
    empresarios: ['Alex Todres'],
    aliases: ['DECOLAR COM', 'DECOLAR VIAGENS'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Agência de Turismo Online',
  },
  {
    cnpj: '10760260000119',
    razaoSocial: 'CVC BRASIL OPERADORA E AGENCIA DE VIAGENS S.A.',
    nomeFantasia: 'CVC',
    empresarios: ['Guilherme Paulus', 'Fabio Godinho'],
    aliases: ['CVC VIAGENS', 'GRUPO CVC'],
    uf: 'SP',
    municipio: 'Santo André',
    segmento: 'Turismo e Agência de Viagens',
  },
  // ==========================================
  // Indústria, Construção e Materiais
  // ==========================================
  {
    cnpj: '90049792000181',
    razaoSocial: 'TRAMONTINA S/A CUTELARIA',
    nomeFantasia: 'TRAMONTINA',
    empresarios: ['Clovis Tramontina', 'Eduardo Sampaio'],
    aliases: ['TRAMONTINA PANELAS', 'GRUPO TRAMONTINA'],
    uf: 'RS',
    municipio: 'Carlos Barbosa',
    segmento: 'Utensílios Domésticos e Ferramentas',
  },
  {
    cnpj: '84684455000173',
    razaoSocial: 'TIGRE MATERIAIS E SOLUCOES PARA CONSTRUCAO S.A.',
    nomeFantasia: 'TIGRE',
    empresarios: ['Otto Engelmann', 'Felipe Hansen'],
    aliases: ['TIGRE TUBOS E CONEXOES'],
    uf: 'SC',
    municipio: 'Joinville',
    segmento: 'Tubos, Conexões e Construção',
  },
  {
    cnpj: '97837181000147',
    razaoSocial: 'DEXCO S.A. (ANTIGA DURATEX / DECA)',
    nomeFantasia: 'DEXCO / DURATEX / DECA',
    empresarios: ['Antonio Joaquim de Oliveira'],
    aliases: ['DURATEX', 'DECA', 'CEUSA', 'PORTINARI'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Painéis de Madeira e Louças Sanitárias',
  },
  {
    cnpj: '01438784000105',
    razaoSocial: 'LEROY MERLIN COMPANHIA BRASILEIRA DE BRICOLAGEM',
    nomeFantasia: 'LEROY MERLIN',
    empresarios: ['Ignacio Sanchez'],
    aliases: ['LEROY MERLIN BRASIL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Home Center e Materiais de Construção',
  },
  {
    cnpj: '16614075000100',
    razaoSocial: 'DIRECIONAL ENGENHARIA S.A.',
    nomeFantasia: 'DIRECIONAL ENGENHARIA',
    empresarios: ['Ricardo Valadares Gontijo', 'Ricardo Ribeiro Valadares Gontijo'],
    aliases: ['DIRECIONAL', 'RIVA INCORPORADORA'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Construção Civil e Incorporação',
  },
  {
    cnpj: '08790698000127',
    razaoSocial: 'CURY CONSTRUTORA E INCORPORADORA S.A.',
    nomeFantasia: 'CURY CONSTRUTORA',
    empresarios: ['Fabio Cury', 'Ronaldo Cury'],
    aliases: ['CURY'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Construção Civil e Imóveis',
  },
  {
    cnpj: '07816890000153',
    razaoSocial: 'MULTIPLAN EMPREENDIMENTOS IMOBILIARIOS S.A.',
    nomeFantasia: 'MULTIPLAN / SHOPPINGS MULTIPLAN',
    empresarios: ['José Isaac Peres', 'Eduardo Kaminitz Peres'],
    aliases: ['MULTIPLAN', 'BARRA SHOPPING', 'MORUMBI SHOPPING'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Shopping Centers e Imóveis Comerciais',
  },
  {
    cnpj: '51218147000193',
    razaoSocial: 'IGUATEMI S.A.',
    nomeFantasia: 'IGUATEMI SHOPPING',
    empresarios: ['Carlos Jereissati', 'Cristina Betts'],
    aliases: ['IGUATEMI', 'SHOPPING IGUATEMI'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Shopping Centers',
  },
  // ==========================================
  // Educação e Universidades
  // ==========================================
  {
    cnpj: '02800026000140',
    razaoSocial: 'COGNA EDUCACAO S.A. (KROTON / ANHANGUERA)',
    nomeFantasia: 'COGNA / ANHANGUERA / PITAGORAS',
    empresarios: ['Rodrigo Galindo', 'Roberto Valério'],
    aliases: ['KROTON', 'COGNA', 'ANHANGUERA EDUCACIONAL'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Ensino Superior e Básico',
  },
  {
    cnpj: '08807432000110',
    razaoSocial: 'YDUQS PARTICIPACOES S.A. (ESTACIO / IBMEC)',
    nomeFantasia: 'ESTACIO / IBMEC / YDUQS',
    empresarios: ['Eduardo Parente', 'Chaim Zaher'],
    aliases: ['ESTACIO', 'IBMEC', 'YDUQS'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Ensino Superior',
  },
  {
    cnpj: '09288252000132',
    razaoSocial: 'ANIMA HOLDING S.A.',
    nomeFantasia: 'ANIMA EDUCACAO (SAO JUDAS / ANHEMBI MORUMBI / UNA)',
    empresarios: ['Daniel Faccini Castanho', 'Marcelo Battistella Bueno'],
    aliases: ['ANIMA', 'UNIVERSIDADE SAO JUDAS', 'ANHEMBI MORUMBI', 'UNA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Ensino Superior',
  },
  {
    cnpj: '33641663000144',
    razaoSocial: 'FUNDACAO GETULIO VARGAS - FGV',
    nomeFantasia: 'FGV',
    empresarios: ['Carlos Ivan Simonsen Leal'],
    aliases: ['FUNDACAO GETULIO VARGAS', 'FGV DIREITO', 'FGV EESP'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Ensino e Pesquisa Econômica',
  },
  {
    cnpj: '60967751000197',
    razaoSocial: 'INSTITUTO PRESBITERIANO MACKENZIE',
    nomeFantasia: 'MACKENZIE',
    empresarios: ['Milton Flávio Moura'],
    aliases: ['UNIVERSIDADE MACKENZIE', 'COLEGIO MACKENZIE'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Ensino Superior e Colégios',
  },
  // ==========================================
  // Supermercados e Redes Regionais
  // ==========================================
  {
    cnpj: '04641376000136',
    razaoSocial: 'SUPERMERCADOS BH COMERCIO DE ALIMENTOS S/A',
    nomeFantasia: 'SUPERMERCADOS BH',
    empresarios: ['Waldir Rocha Pena'],
    aliases: ['SUPERMERCADO BH', 'REDE BH'],
    uf: 'MG',
    municipio: 'Santa Luzia',
    segmento: 'Supermercados e Varejo de Alimentos',
  },
  {
    cnpj: '76430438000100',
    razaoSocial: 'IRMAOS MUFFATO E CIA LTDA.',
    nomeFantasia: 'MUFFATO / MAX ATACADISTA',
    empresarios: ['Everton Muffato', 'Ederson Muffato'],
    aliases: ['GRUPO MUFFATO', 'SUPERMERCADOS MUFFATO', 'MAX ATACADISTA'],
    uf: 'PR',
    municipio: 'Cascavel',
    segmento: 'Supermercados e Atacarejo',
  },
  {
    cnpj: '83646984000142',
    razaoSocial: 'A. ANGELONI E CIA. LTDA.',
    nomeFantasia: 'ANGELONI SUPERMERCADOS',
    empresarios: ['Arnaldo Angeloni'],
    aliases: ['REDE ANGELONI', 'FARMACIAS ANGELONI'],
    uf: 'SC',
    municipio: 'Criciúma',
    segmento: 'Supermercados e Farmácias',
  },
  {
    cnpj: '33045642000150',
    razaoSocial: 'SUPERMERCADOS GUANABARA S.A.',
    nomeFantasia: 'SUPERMERCADOS GUANABARA',
    empresarios: ['Albino Pinho'],
    aliases: ['GUANABARA ANIVERSARIO', 'GUANABARA'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Supermercados e Varejo',
  },
  {
    cnpj: '47962345000127',
    razaoSocial: 'SAVEGNAGO SUPERMERCADOS LTDA.',
    nomeFantasia: 'SAVEGNAGO SUPERMERCADOS',
    empresarios: ['Chalim Savegnago', 'Antonio Savegnago'],
    aliases: ['SAVEGNAGO', 'REDE SAVEGNAGO'],
    uf: 'SP',
    municipio: 'Sertãozinho',
    segmento: 'Supermercados e Atacarejo',
  },
  {
    cnpj: '93015006000113',
    razaoSocial: 'COMPANHIA ZAFFARI COMERCIO E INDUSTRIA',
    nomeFantasia: 'ZAFFARI / BOURBON SHOPPING',
    empresarios: ['Claudio Zaffari'],
    aliases: ['ZAFFARI SUPERMERCADOS', 'BOURBON'],
    uf: 'RS',
    municipio: 'Porto Alegre',
    segmento: 'Supermercados e Shoppings',
  },
  {
    cnpj: '01157555000129',
    razaoSocial: 'TENDA ATACADO S.A.',
    nomeFantasia: 'TENDA ATACADO',
    empresarios: ['Pedro Severino', 'Carlos Severino'],
    aliases: ['TENDA', 'TENDA ATACADISTA'],
    uf: 'SP',
    municipio: 'Guarulhos',
    segmento: 'Atacarejo e Varejo',
  },
  {
    cnpj: '03953535000135',
    razaoSocial: 'ROLDAO AUTO SERVICO COMERCIO DE ALIMENTOS LTDA.',
    nomeFantasia: 'ROLDAO ATACADISTA',
    empresarios: ['Ricardo Roldão'],
    aliases: ['ROLDAO', 'ROLDAO ATACADO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Atacarejo de Alimentos',
  },
  // ==========================================
  // Farmácias, Drogarias e Saúde
  // ==========================================
  {
    cnpj: '17256509000160',
    razaoSocial: 'DROGARIA ARAUJO S.A.',
    nomeFantasia: 'DROGARIA ARAUJO',
    empresarios: ['Modesto Carvalho de Araujo Neto', 'Alfredo Carvalho de Araujo'],
    aliases: ['ARAUJO', 'DROGARIA ARAUJO BH', 'ARAUJO MEDICAMENTOS'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Farmácias e Drogarias',
  },
  {
    cnpj: '92950788000138',
    razaoSocial: 'COMERCIO DE MEDICAMENTOS SAO JOAO LTDA',
    nomeFantasia: 'FARMACIAS SAO JOAO',
    empresarios: ['Pedro Henrique Brair'],
    aliases: ['FARMACIA SAO JOAO', 'REDE SAO JOAO', 'SAO JOAO DROGARIAS'],
    uf: 'RS',
    municipio: 'Passo Fundo',
    segmento: 'Farmácias e Medicamentos',
  },
  {
    cnpj: '60448834000192',
    razaoSocial: 'HOSPITAL SAMARITANO S.A.',
    nomeFantasia: 'HOSPITAL SAMARITANO / REDE D\'OR',
    empresarios: ['Paulo Moll', 'Jorge Moll Filho'],
    aliases: ['SAMARITANO', 'HOSPITAL SAMARITANO HIGIENOPOLIS', 'SAMARITANO PAULISTA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Hospitais e Serviços Médicos',
  },
  {
    cnpj: '02717904000170',
    razaoSocial: 'LABORATORIO SABIN DE ANALISES CLINICAS S.A.',
    nomeFantasia: 'SABIN MEDICINA DIAGNOSTICA',
    empresarios: ['Janete Vaz', 'Sandra Costa', 'Lídia Abdalla'],
    aliases: ['SABIN', 'LABORATORIO SABIN', 'GRUPO SABIN'],
    uf: 'DF',
    municipio: 'Brasília',
    segmento: 'Medicina Diagnóstica e Análises Clínicas',
  },
  {
    cnpj: '19378769000191',
    razaoSocial: 'INSTITUTO HERMES PARDINI S.A.',
    nomeFantasia: 'HERMES PARDINI',
    empresarios: ['Roberto Pardini', 'Victor Cavalcanti'],
    aliases: ['PARDINI', 'LABORATORIO HERMES PARDINI', 'GRUPO FLEURY PARDINI'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Medicina Diagnóstica e Laboratórios',
  },
  {
    cnpj: '16697248000196',
    razaoSocial: 'HOSPITAL MATER DEI S.A.',
    nomeFantasia: 'MATER DEI',
    empresarios: ['Henrique Salvador', 'José Salvador Silva'],
    aliases: ['REDE MATER DEI', 'MATER DEI SANTO AGOSTINHO', 'MATER DEI CONTORNO'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Hospitais e Atendimento Médico',
  },
  {
    cnpj: '63554067000198',
    razaoSocial: 'HAPVIDA PARTICIPACOES E INVESTIMENTOS S.A.',
    nomeFantasia: 'HAPVIDA NOTREDAME INTERMEDICA',
    empresarios: ['Candido Pinheiro Koren de Lima', 'Jorge Pinheiro'],
    aliases: ['HAPVIDA', 'NOTREDAME INTERMEDICA', 'GNDI'],
    uf: 'CE',
    municipio: 'Fortaleza',
    segmento: 'Planos de Saúde e Hospitais',
  },
  {
    cnpj: '01639446000198',
    razaoSocial: 'SUL AMERICA S.A.',
    nomeFantasia: 'SULAMERICA SAUDE E SEGUROS',
    empresarios: ['Gabriel Portella', 'Ricardo Bottas'],
    aliases: ['SULAMERICA', 'SUL AMERICA', 'SULAMERICA SAUDE'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Seguros e Planos de Saúde',
  },
  {
    cnpj: '61198164000160',
    razaoSocial: 'PORTO SEGURO S.A.',
    nomeFantasia: 'PORTO SEGURO',
    empresarios: ['Jayme Brasil Garfinkel', 'Bruno Garfinkel', 'Paulo Kakinoff'],
    aliases: ['PORTO', 'PORTO SEGUROS', 'PORTO SAUDE'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Seguros, Saúde e Finanças',
  },
  {
    cnpj: '33055146000193',
    razaoSocial: 'BRADESCO SEGUROS S.A.',
    nomeFantasia: 'BRADESCO SEGUROS E PREVIDENCIA',
    empresarios: ['Ivan Gontijo', 'Octavio de Lazari Junior'],
    aliases: ['BRADESCO SAUDE', 'GRUPO BRADESCO SEGUROS'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Seguros e Saúde Suplementar',
  },
  {
    cnpj: '29309127000179',
    razaoSocial: 'AMIL ASSISTENCIA MEDICA INTERNACIONAL S.A.',
    nomeFantasia: 'AMIL',
    empresarios: ['Edson de Godoy Bueno', 'José Seripieri Filho'],
    aliases: ['AMIL SAUDE', 'AMIL PLANOS DE SAUDE'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Planos de Saúde e Assistência Médica',
  },
  // ==========================================
  // Gastronomia, Redes e Restaurantes
  // ==========================================
  {
    cnpj: '60882677000100',
    razaoSocial: 'FASANO GASTRONOMIA E HOTELARIA S.A.',
    nomeFantasia: 'FASANO / RESTAURANTE FASANO',
    empresarios: ['Rogério Fasano'],
    aliases: ['FASANO', 'RESTAURANTE FASANO', 'HOTEL FASANO', 'GERO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Alta Gastronomia e Hotelaria',
  },
  {
    cnpj: '04534720000180',
    razaoSocial: 'BELLA PAULISTA RESTAURANTE, PAES, DOCES E CONVENIENCIAS LTDA',
    nomeFantasia: 'PADARIA BELLA PAULISTA',
    empresarios: ['Carlos Pereira'],
    aliases: ['BELLA PAULISTA', 'PADARIA BELLA PAULISTA', 'PADARIA CERQUEIRA CESAR'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Panificação, Confeitaria e Restaurante 24h',
  },
  // ==========================================
  // Supermercados Regionais e Grandes Redes
  // ==========================================
  {
    cnpj: '33045642000180',
    razaoSocial: 'SUPERMERCADOS GUANABARA S.A.',
    nomeFantasia: 'SUPERMERCADOS GUANABARA',
    empresarios: ['Albino Pinho', 'Francisco Pinho'],
    aliases: ['GUANABARA', 'GUANABARA SUPERMERCADOS', 'ANIVERSARIO GUANABARA'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Supermercados e Varejo de Alimentos',
  },
  {
    cnpj: '04641376000136',
    razaoSocial: 'SUPERMERCADOS BH COMERCIO DE ALIMENTOS S.A.',
    nomeFantasia: 'SUPERMERCADOS BH',
    empresarios: ['Pedro Lourenço de Oliveira (Pedrinho BH)'],
    aliases: ['BH SUPERMERCADOS', 'PEDRINHO BH', 'SUPER BH'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Supermercados e Atacarejo',
  },
  {
    cnpj: '21840889000105',
    razaoSocial: 'SUPER NOSSO COMERCIO LTDA.',
    nomeFantasia: 'SUPER NOSSO / APOIO MINEIRO',
    empresarios: ['Euler Fuad Nejm'],
    aliases: ['SUPER NOSSO', 'APOIO MINEIRO', 'GRUPO SUPER NOSSO'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Supermercados Gourmet e Atacarejo',
  },
  {
    cnpj: '04595603000180',
    razaoSocial: 'MART MINAS DISTRIBUICAO E VAREJO LTDA.',
    nomeFantasia: 'MART MINAS ATACADO E VAREJO',
    empresarios: ['Murilo Martins', 'Ronaldo Martins'],
    aliases: ['MART MINAS', 'MART MINAS ATACAREJO'],
    uf: 'MG',
    municipio: 'Contagem',
    segmento: 'Atacarejo e Distribuição',
  },
  {
    cnpj: '83646984000156',
    razaoSocial: 'A. ANGELONI & CIA. LTDA.',
    nomeFantasia: 'ANGELONI SUPERMERCADOS',
    empresarios: ['Antenor Angeloni', 'Arnaldo Angeloni'],
    aliases: ['ANGELONI', 'REDE ANGELONI'],
    uf: 'SC',
    municipio: 'Criciúma',
    segmento: 'Supermercados e Farmácias',
  },
  {
    cnpj: '76189406000126',
    razaoSocial: 'CONDOR SUPERMERCADOS S.A.',
    nomeFantasia: 'SUPERMERCADOS CONDOR',
    empresarios: ['Pedro Joanir Zonta'],
    aliases: ['CONDOR', 'REDE CONDOR', 'HIPER CONDOR'],
    uf: 'PR',
    municipio: 'Curitiba',
    segmento: 'Supermercados e Hipermercados',
  },
  {
    cnpj: '76430438000190',
    razaoSocial: 'IRMAOS MUFFATO & CIA. LTDA.',
    nomeFantasia: 'SUPER MUFFATO / MAX ATACADISTA',
    empresarios: ['Ederson Muffato', 'Everton Muffato', 'Eduardo Muffato'],
    aliases: ['MUFFATO', 'SUPER MUFFATO', 'MAX ATACADISTA'],
    uf: 'PR',
    municipio: 'Cascavel',
    segmento: 'Supermercados e Atacarejo',
  },
  {
    cnpj: '65715971000190',
    razaoSocial: 'TAUSTE COMERCIO DE ALIMENTOS LTDA.',
    nomeFantasia: 'TAUSTE SUPERMERCADOS',
    empresarios: ['Guilherme Cunha'],
    aliases: ['TAUSTE', 'SUPERMERCADOS TAUSTE'],
    uf: 'SP',
    municipio: 'Marília',
    segmento: 'Supermercados e Varejo Alimentício',
  },
  {
    cnpj: '44959666000130',
    razaoSocial: 'SAVEGNAGO SUPERMERCADOS LTDA.',
    nomeFantasia: 'SAVEGNAGO',
    empresarios: ['Chalita Savegnago', 'Sebastião Edson Savegnago'],
    aliases: ['SAVEGNAGO', 'SUPERMERCADOS SAVEGNAGO'],
    uf: 'SP',
    municipio: 'Sertãozinho',
    segmento: 'Supermercados e Varejo',
  },
  {
    cnpj: '01937635000120',
    razaoSocial: 'SONDA SUPERMERCADOS EXPORTACAO E IMPORTACAO S/A',
    nomeFantasia: 'SONDA SUPERMERCADOS',
    empresarios: ['Idalmino Sonda', 'Delcir Sonda'],
    aliases: ['SONDA', 'SUPERMERCADO SONDA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Supermercados e Varejo',
  },
  // ==========================================
  // Pet, Papelaria e Utilidades
  // ==========================================
  {
    cnpj: '53153938000190',
    razaoSocial: 'COBASI COMERCIO DE PRODUTOS PARA ANIMAIS LTDA.',
    nomeFantasia: 'COBASI',
    empresarios: ['Paulo Nassar', 'João Nassar'],
    aliases: ['COBASI PET SHOP', 'PET SHOP COBASI'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Pet Shop, Agropecuária e Jardinagem',
  },
  {
    cnpj: '18388123000190',
    razaoSocial: 'PET CENTER COMERCIO E PARTICIPACOES S.A.',
    nomeFantasia: 'PETZ',
    empresarios: ['Sergio Zimerman'],
    aliases: ['PETZ', 'PETZ PET SHOP'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Pet Shop e Produtos Veterinários',
  },
  {
    cnpj: '43214055000107',
    razaoSocial: 'KALUNGA S.A. INDUSTRIA GRAFICA E COMERCIO',
    nomeFantasia: 'KALUNGA',
    empresarios: ['Paulo Garcia', 'Damião Garcia'],
    aliases: ['KALUNGA PAPELARIA', 'KALUNGA INFORMATICA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Papelaria, Material de Escritório e Informática',
  },
  // ==========================================
  // Telecomunicações, Tecnologia e Turismo
  // ==========================================
  {
    cnpj: '40432544000147',
    razaoSocial: 'CLARO S.A.',
    nomeFantasia: 'CLARO / EMBRATEL / NET',
    empresarios: ['José Félix', 'Carlos Slim'],
    aliases: ['CLARO', 'EMBRATEL', 'NET CLARO', 'CLARO BRASIL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Telecomunicações e Internet Banda Larga',
  },
  {
    cnpj: '02558157000162',
    razaoSocial: 'TELEFONICA BRASIL S.A.',
    nomeFantasia: 'VIVO / TELEFONICA',
    empresarios: ['Christian Gebara', 'Eduardo Navarro'],
    aliases: ['VIVO', 'TELEFONICA', 'VIVO TELECOM'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Telecomunicações e Telefonia Celular',
  },
  {
    cnpj: '02421421000111',
    razaoSocial: 'TIM S.A.',
    nomeFantasia: 'TIM',
    empresarios: ['Alberto Griselli'],
    aliases: ['TIM BRASIL', 'TIM TELECOM'],
    uf: 'RJ',
    municipio: 'Rio de Janeiro',
    segmento: 'Telecomunicações e Telefonia Celular',
  },
  {
    cnpj: '10762983000188',
    razaoSocial: 'CVC BRASIL OPERADORA E AGENCIA DE VIAGENS S.A.',
    nomeFantasia: 'CVC VIAGENS',
    empresarios: ['Guilherme Paulus', 'Fabio Godinho'],
    aliases: ['CVC', 'CVC BRASIL', 'CVC TURISMO'],
    uf: 'SP',
    municipio: 'Santo André',
    segmento: 'Turismo e Agência de Viagens',
  },
  {
    cnpj: '07575651000159',
    razaoSocial: 'GOL LINHAS AEREAS S.A.',
    nomeFantasia: 'GOL / GOL LINHAS AEREAS',
    empresarios: ['Constantino de Oliveira Junior', 'Celso Ferrer'],
    aliases: ['GOL', 'GOL TRANSPORTES AEREOS', 'GOL AIRLINES'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Aviação Comercial e Transporte Aéreo',
  },
  {
    cnpj: '09296295000160',
    razaoSocial: 'AZUL LINHAS AEREAS BRASILEIRAS S.A.',
    nomeFantasia: 'AZUL',
    empresarios: ['David Neeleman', 'John Rodgerson'],
    aliases: ['AZUL LINHAS AEREAS', 'AZUL AIRLINES'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Aviação Comercial e Transporte Aéreo',
  },
  {
    cnpj: '02012862000160',
    razaoSocial: 'TAM LINHAS AEREAS S.A. (LATAM AIRLINES BRASIL)',
    nomeFantasia: 'LATAM AIRLINES',
    empresarios: ['Jerome Cadier', 'Rolim Amaro'],
    aliases: ['LATAM', 'TAM', 'LATAM BRASIL', 'TAM LINHAS AEREAS'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Aviação Comercial e Transporte Aéreo',
  },
  {
    cnpj: '62173620000180',
    razaoSocial: 'SERASA S.A.',
    nomeFantasia: 'SERASA EXPERIAN',
    empresarios: ['Valdemir de Oliveira'],
    aliases: ['SERASA', 'SERASA EXPERIAN', 'CONSULTA SERASA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Análise de Crédito e Informações Financeiras',
  },
  {
    cnpj: '09346601000125',
    razaoSocial: 'B3 S.A. - BRASIL, BOLSA, BALCAO',
    nomeFantasia: 'B3 / BOLSA DE VALORES',
    empresarios: ['Gilson Finkelsztain'],
    aliases: ['B3', 'BOVESPA', 'BM&FBOVESPA', 'BOLSA DE VALORES DE SAO PAULO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Mercado Financeiro e Bolsa de Valores',
  },
  // ==========================================
  // Big Techs no Brasil
  // ==========================================
  {
    cnpj: '06990590000123',
    razaoSocial: 'GOOGLE BRASIL INTERNET LTDA.',
    nomeFantasia: 'GOOGLE BRASIL',
    empresarios: ['Fabio Coelho'],
    aliases: ['GOOGLE', 'GOOGLE BRASIL', 'ALPHABET BRASIL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Tecnologia da Informação e Internet',
  },
  {
    cnpj: '60316817000103',
    razaoSocial: 'MICROSOFT DO BRASIL IMPORTACAO E COMERCIO DE SOFTWARE E VIDEO GAMES LTDA.',
    nomeFantasia: 'MICROSOFT BRASIL',
    empresarios: ['Tania Cosentino'],
    aliases: ['MICROSOFT', 'MICROSOFT BRASIL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Software, Nuvem e Tecnologia',
  },
  {
    cnpj: '00623904000173',
    razaoSocial: 'APPLE COMPUTER BRASIL LTDA.',
    nomeFantasia: 'APPLE BRASIL',
    empresarios: ['Tim Cook'],
    aliases: ['APPLE', 'APPLE BRASIL', 'APPLE STORE'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Eletrônicos e Tecnologia',
  },
  {
    cnpj: '15436940000103',
    razaoSocial: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
    nomeFantasia: 'AMAZON BRASIL',
    empresarios: ['Daniel Mazini'],
    aliases: ['AMAZON', 'AMAZON.COM.BR', 'AMAZON BRASIL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'E-commerce, Nuvem e Tecnologia',
  },
  {
    cnpj: '17895646000187',
    razaoSocial: 'UBER DO BRASIL TECNOLOGIA LTDA.',
    nomeFantasia: 'UBER BRASIL',
    empresarios: ['Dara Khosrowshahi'],
    aliases: ['UBER', 'UBER BRASIL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Mobilidade Urbana e Tecnologia',
  },
  {
    cnpj: '18033552000161',
    razaoSocial: '99 TECNOLOGIA LTDA.',
    nomeFantasia: '99 / 99APP',
    empresarios: ['Paulo Veras', 'Renato Freitas'],
    aliases: ['99', '99 POP', '99 TAXI', 'DIDIGLOBAL'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Mobilidade Urbana e Aplicativos',
  },
  // ==========================================
  // Fintechs, Meios de Pagamento e Bancos Digitais
  // ==========================================
  {
    cnpj: '16501555000157',
    razaoSocial: 'STONE INSTITUICAO DE PAGAMENTO S.A.',
    nomeFantasia: 'STONE / TON',
    empresarios: ['André Street', 'Eduardo Pontes', 'Pedro Zinner'],
    aliases: ['STONE', 'TON', 'MAQUININHA STONE', 'STONE PAGAMENTOS'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Meios de Pagamento e Maquininhas',
  },
  {
    cnpj: '08561701000101',
    razaoSocial: 'PAGSEGURO INTERNET S.A. (PAGBANK)',
    nomeFantasia: 'PAGBANK / PAGSEGURO',
    empresarios: ['Luiz Frias', 'Alexandre Magnani'],
    aliases: ['PAGSEGURO', 'PAGBANK', 'MODERNINHA', 'UOL PAGSEGURO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Banco Digital e Meios de Pagamento',
  },
  {
    cnpj: '01027058000191',
    razaoSocial: 'CIELO S.A. - INSTITUICAO DE PAGAMENTO',
    nomeFantasia: 'CIELO',
    empresarios: ['Estanislau Bassols'],
    aliases: ['CIELO', 'MAQUININHA CIELO', 'VISANET'],
    uf: 'SP',
    municipio: 'Barueri',
    segmento: 'Meios de Pagamento e Cartões',
  },
  {
    cnpj: '01425787000104',
    razaoSocial: 'REDECARD S.A.',
    nomeFantasia: 'REDE / REDECARD',
    empresarios: ['Marcos Magalhães'],
    aliases: ['REDE', 'REDECARD', 'MAQUININHA REDE'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Meios de Pagamento e Adquirência',
  },
  {
    cnpj: '22896431000110',
    razaoSocial: 'PICPAY INSTITUICAO DE PAGAMENTO S.A.',
    nomeFantasia: 'PICPAY',
    empresarios: ['José Antônio Batista', 'Eduardo Chedid'],
    aliases: ['PICPAY', 'PICPAY CARTOES', 'BANCO PICPAY'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Carteira Digital e Banco Digital',
  },
  {
    cnpj: '00416968000101',
    razaoSocial: 'BANCO INTER S.A.',
    nomeFantasia: 'BANCO INTER / INTER',
    empresarios: ['Rubens Menin', 'João Vitor Menin'],
    aliases: ['INTER', 'BANCO INTER', 'INTERMEDIUM'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Banco Digital e Serviços Financeiros',
  },
  {
    cnpj: '31872495000172',
    razaoSocial: 'BANCO C6 S.A.',
    nomeFantasia: 'C6 BANK',
    empresarios: ['Marcelo Kalim', 'Luiz Marcelo Calicchio'],
    aliases: ['C6', 'C6 BANK', 'BANCO C6'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Banco Digital e Finanças',
  },
  {
    cnpj: '59285411000113',
    razaoSocial: 'BANCO PAN S.A.',
    nomeFantasia: 'BANCO PAN',
    empresarios: ['Carlos Eduardo Guimarães'],
    aliases: ['BANCO PAN', 'PAN', 'PANAMERICANO'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Banco Múltiplo e Financiamento',
  },
  {
    cnpj: '16670085000155',
    razaoSocial: 'LOCALIZA RENT A CAR S.A.',
    nomeFantasia: 'LOCALIZA HERTZ / LOCALIZA',
    empresarios: ['Salim Mattar', 'Eugênio Mattar', 'Bruno Lasansky'],
    aliases: ['LOCALIZA', 'LOCALIZA ALUGUEL DE CARROS', 'LOCALIZA HERTZ'],
    uf: 'MG',
    municipio: 'Belo Horizonte',
    segmento: 'Locação de Veículos e Frotas',
  },
  {
    cnpj: '07976147000160',
    razaoSocial: 'MOVIDA LOCACAO DE VEICULOS S.A.',
    nomeFantasia: 'MOVIDA ALUGUEL DE CARROS',
    empresarios: ['Renato Franklin', 'Pedro Almeida'],
    aliases: ['MOVIDA', 'MOVIDA RENT A CAR', 'GRUPO SIMPAR MOVIDA'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Locação de Veículos',
  },
  {
    cnpj: '04949905000163',
    razaoSocial: 'UNIDAS LOCADORA S.A.',
    nomeFantasia: 'UNIDAS',
    empresarios: ['Luis Fernando Porto'],
    aliases: ['UNIDAS', 'UNIDAS ALUGUEL DE CARROS'],
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Locação de Veículos e Gestão de Frotas',
  },
];

/**
 * Normalizes text removing accents, punctuation and converting to lowercase for robust fuzzy search
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if a word token matches any word or word prefix in target text
 */
function tokenMatchesWords(targetWords: string[], token: string): boolean {
  return targetWords.some((w) => w === token || (token.length >= 4 && w.startsWith(token)));
}

/**
 * Searches the company database by:
 * - CNPJ (digits or formatted)
 * - Razão Social
 * - Nome Fantasia
 * - Nome do Empresário / Sócio / Fundador
 * - Aliases / Marcas Populares
 */
export function searchCompanies(
  query: string,
  mode: 'all' | 'cnpj' | 'razao' | 'empresario' = 'all'
): CompanySearchRecord[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const cleanQueryDigits = cleanDigits(trimmed);
  const normalizedQuery = normalizeSearchText(trimmed);
  const hasLetters = /[a-zA-Z]/.test(trimmed);

  // If input is digits only or length >= 4 without letters, match CNPJ
  if (!hasLetters && cleanQueryDigits.length >= 4) {
    const cnpjMatches = COMPANY_CATALOG.filter((comp) => comp.cnpj.includes(cleanQueryDigits));
    if (cnpjMatches.length > 0) {
      return cnpjMatches;
    }
  }

  // Filter stop words from tokens
  const stopWords = new Set([
    'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
    'e', 'ou', 'com', 'para', 'por', 'sa', 's/a', 'ltda', 'me', 'epp',
    'cia', 'eireli', 'grupo', 'brasil', 'servicos', 'comercio', 'industria'
  ]);
  const queryTokens = normalizedQuery
    .split(/\s+/)
    .filter((t) => t.length > 1 && !stopWords.has(t));

  const scoredResults: { comp: CompanySearchRecord; score: number }[] = [];

  for (const comp of COMPANY_CATALOG) {
    const normRazao = normalizeSearchText(comp.razaoSocial);
    const normFantasia = normalizeSearchText(comp.nomeFantasia);
    const normEmpresarios = comp.empresarios.map(normalizeSearchText);
    const normAliases = (comp.aliases || []).map(normalizeSearchText);
    const normSegmento = normalizeSearchText(comp.segmento);

    let score = 0;

    // 1. Exact phrase matches (highest priority)
    if (normFantasia === normalizedQuery || normRazao === normalizedQuery) {
      score += 150;
    } else if (normAliases.some((a) => a === normalizedQuery)) {
      score += 140;
    } else if (normEmpresarios.some((e) => e === normalizedQuery)) {
      score += 130;
    } else if (normFantasia.startsWith(normalizedQuery) || normRazao.startsWith(normalizedQuery)) {
      score += 100;
    } else if (normFantasia.includes(normalizedQuery) || normRazao.includes(normalizedQuery)) {
      score += 85;
    } else if (normAliases.some((a) => a.includes(normalizedQuery))) {
      score += 80;
    } else if (normEmpresarios.some((e) => e.includes(normalizedQuery))) {
      score += 75;
    }

    // 2. Token overlap matches against corporate identity (Razao, Fantasia, Aliases, Empresarios)
    if (queryTokens.length > 0) {
      const identityText = `${normRazao} ${normFantasia} ${normAliases.join(' ')} ${normEmpresarios.join(' ')}`;
      const identityWords = identityText.split(/\s+/);
      const matchedIdentityTokens = queryTokens.filter((token) => tokenMatchesWords(identityWords, token));

      if (matchedIdentityTokens.length === queryTokens.length) {
        score += 80;
      } else if (queryTokens.length > 1 && matchedIdentityTokens.length >= Math.ceil(queryTokens.length * 0.6)) {
        score += (matchedIdentityTokens.length / queryTokens.length) * 55;
      } else if (queryTokens.length === 1 && matchedIdentityTokens.length === 1) {
        score += 65;
      }

      // Minor boost for segment words only if there is already an identity match or multi-token query
      const segmentWords = normSegmento.split(/\s+/);
      const matchedSegmentTokens = queryTokens.filter((token) => tokenMatchesWords(segmentWords, token));
      if (matchedSegmentTokens.length > 0) {
        score += matchedSegmentTokens.length * 10;
      }
    }

    // Mode-specific boost
    if (mode === 'empresario') {
      const empMatches = normEmpresarios.some(
        (e) => e.includes(normalizedQuery) || (queryTokens.length > 0 && queryTokens.every((t) => e.includes(t)))
      );
      if (empMatches) score += 40;
    } else if (mode === 'razao') {
      const nameMatches = normRazao.includes(normalizedQuery) || normFantasia.includes(normalizedQuery);
      if (nameMatches) score += 40;
    }

    // Quality threshold: must have high confidence (exact, substring, or identity token match)
    if (score >= 40) {
      scoredResults.push({ comp, score });
    }
  }

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);
  return scoredResults.map((r) => r.comp);
}

/**
 * Client-side helper that queries the backend search API (/api/search-company),
 * falling back to local search if offline.
 */
export async function queryCompanySearchApi(
  query: string,
  mode: 'all' | 'cnpj' | 'razao' | 'empresario' = 'all'
): Promise<CompanySearchRecord[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Check local catalog first
  const localResults = searchCompanies(trimmed, mode);
  if (localResults.length > 0) {
    return localResults;
  }

  // If nothing local, fetch from server API with resilient timeout
  try {
    const url = `/api/search-company?q=${encodeURIComponent(trimmed)}&mode=${encodeURIComponent(mode)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        return data.results;
      }
    }
  } catch (err) {
    console.warn('Backend search API unreachable or timed out:', err);
  }

  return localResults;
}
