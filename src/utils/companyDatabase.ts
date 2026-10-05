import { cleanDigits } from './formatters';

export interface CompanySearchRecord {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  empresarios: string[]; // Nome do empresário / sócios principais / fundadores
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
    uf: 'SP',
    municipio: 'São Paulo',
    segmento: 'Marketplace e E-commerce',
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
 * Searches the company database by:
 * - CNPJ (digits or formatted)
 * - Razão Social
 * - Nome Fantasia
 * - Nome do Empresário / Sócio / Fundador
 */
export function searchCompanies(
  query: string,
  mode: 'all' | 'cnpj' | 'razao' | 'empresario' = 'all'
): CompanySearchRecord[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const cleanQueryDigits = cleanDigits(trimmed);
  const normalizedQuery = normalizeSearchText(trimmed);

  // If search query is numbers and in CNPJ mode or length >= 4
  if (cleanQueryDigits.length >= 4 && (mode === 'cnpj' || mode === 'all' || /^\d+$/.test(cleanQueryDigits))) {
    const cnpjMatches = COMPANY_CATALOG.filter((comp) => comp.cnpj.includes(cleanQueryDigits));
    if (cnpjMatches.length > 0) {
      return cnpjMatches;
    }
  }

  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 1);

  return COMPANY_CATALOG.filter((comp) => {
    const normRazao = normalizeSearchText(comp.razaoSocial);
    const normFantasia = normalizeSearchText(comp.nomeFantasia);
    const normEmpresarios = comp.empresarios.map(normalizeSearchText);
    const normSegmento = normalizeSearchText(comp.segmento);

    // Mode-specific filtering
    if (mode === 'empresario') {
      // Direct match on any partner/entrepreneur
      return normEmpresarios.some(
        (emp) =>
          emp.includes(normalizedQuery) ||
          (queryTokens.length > 0 && queryTokens.every((token) => emp.includes(token)))
      );
    }

    if (mode === 'razao') {
      // Direct match on company legal name or trade name
      return (
        normRazao.includes(normalizedQuery) ||
        normFantasia.includes(normalizedQuery) ||
        (queryTokens.length > 0 &&
          queryTokens.every((token) => normRazao.includes(token) || normFantasia.includes(token)))
      );
    }

    // Default 'all' mode: matches any field
    if (normRazao.includes(normalizedQuery) || normFantasia.includes(normalizedQuery)) {
      return true;
    }

    const matchesEmpresario = normEmpresarios.some(
      (emp) =>
        emp.includes(normalizedQuery) ||
        (queryTokens.length > 0 && queryTokens.every((token) => emp.includes(token)))
    );
    if (matchesEmpresario) return true;

    // Check cross-token match across full company profile
    const fullText = `${normRazao} ${normFantasia} ${normEmpresarios.join(' ')} ${normSegmento}`;
    return queryTokens.length > 0 && queryTokens.every((token) => fullText.includes(token));
  });
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

  // If nothing local, fetch from server API
  try {
    const url = `/api/search-company?q=${encodeURIComponent(trimmed)}&mode=${encodeURIComponent(mode)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

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
