import { jsPDF } from 'jspdf';
import { CnpjData } from '../types/cnpj';
import {
  formatCnpj,
  formatCep,
  formatCurrency,
  formatDate,
  formatPhone,
  formatCnae,
} from './formatters';

export function generateCompanyPdf(data: CnpjData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const est = data.estabelecimento || {};
  const cleanCnpj = est.cnpj || data.cnpj || '';
  const formattedCnpj = formatCnpj(cleanCnpj);
  const razaoSocial = data.razao_social || 'Não informada';
  const nomeFantasia = est.nome_fantasia || data.nome_fantasia || 'Sem nome fantasia registrado';
  const situacao = est.situacao_cadastral || data.situacao_cadastral || 'Ativa';
  const dataSituacao = est.data_situacao_cadastral || data.data_situacao_cadastral;
  const dataAbertura = est.data_inicio_atividade;
  const tipoEstabelecimento = est.tipo || 'Matriz';
  const porte = data.porte?.descricao || 'Demais';
  const natureza = data.natureza_juridica?.descricao || 'Não informada';

  // Address
  const logradouro = `${est.tipo_logradouro ? est.tipo_logradouro + ' ' : ''}${est.logradouro || data.logradouro || '-'}`;
  const numero = est.numero || data.numero || 'SN';
  const complemento = est.complemento ? ` (${est.complemento})` : '';
  const bairro = est.bairro || data.bairro || '-';
  const cep = formatCep(est.cep || data.cep);
  const cidade = typeof est.cidade === 'object' ? est.cidade?.nome : (est.cidade || data.cidade || '-');
  const uf = typeof est.estado === 'object' ? est.estado?.sigla : (est.estado || data.estado || '-');

  // Contacts
  const telefone = formatPhone(est.ddd1, est.telefone1);
  const email = (est.email || data.email || 'Não informado').toLowerCase();

  // CNAE
  const cnaePrincipal = est.atividade_principal || data.atividade_principal;
  const cnaesSecundarios = est.atividades_secundarias || [];

  // QSA
  const socios = data.socios || [];
  const capitalSocial = formatCurrency(data.capital_social);
  const inscricoes = est.inscricoes_estaduais || data.inscricoes_estaduais || [];

  const pageWidth = 210;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Header Box
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(margin, y, contentWidth, 20, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('REPÚBLICA FEDERATIVA DO BRASIL', pageWidth / 2, y + 6, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(52, 211, 153); // Emerald 400
  doc.text('COMPROVANTE DE SITUAÇÃO CADASTRAL', pageWidth / 2, y + 12, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text('CADASTRO NACIONAL DA PESSOA JURÍDICA (CNPJ)', pageWidth / 2, y + 17, { align: 'center' });

  y += 24;

  const drawField = (label: string, value: string, xPos: number, currentY: number, width: number, height: number = 10) => {
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.rect(xPos, currentY, width, height, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(label.toUpperCase(), xPos + 2, currentY + 3.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42); // Slate 900
    const truncatedVal = doc.splitTextToSize(value, width - 4);
    doc.text(truncatedVal[0] || '-', xPos + 2, currentY + 7.5);
  };

  // Row 1: CNPJ & Tipo & Data Abertura
  drawField('NÚMERO DE INSCRIÇÃO', `${formattedCnpj}  (${tipoEstabelecimento})`, margin, y, contentWidth * 0.65);
  drawField('DATA DE ABERTURA', formatDate(dataAbertura), margin + contentWidth * 0.65, y, contentWidth * 0.35);
  y += 11;

  // Row 2: Razão Social
  drawField('NOME EMPRESARIAL (RAZÃO SOCIAL)', razaoSocial, margin, y, contentWidth);
  y += 11;

  // Row 3: Nome Fantasia & Porte
  drawField('TÍTULO DO ESTABELECIMENTO (NOME FANTASIA)', nomeFantasia, margin, y, contentWidth * 0.7);
  drawField('PORTE', porte, margin + contentWidth * 0.7, y, contentWidth * 0.3);
  y += 11;

  // Row 4: Atividade Principal (CNAE)
  const cnaeText = cnaePrincipal ? `${formatCnae(cnaePrincipal.id)} - ${cnaePrincipal.descricao}` : 'Não informada';
  drawField('CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL', cnaeText, margin, y, contentWidth, 12);
  y += 13;

  // Row 5: Natureza Jurídica & Capital Social
  drawField('CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA', natureza, margin, y, contentWidth * 0.65);
  drawField('CAPITAL SOCIAL', capitalSocial, margin + contentWidth * 0.65, y, contentWidth * 0.35);
  y += 11;

  // Row 6: Endereço
  drawField('LOGRADOURO E NÚMERO', `${logradouro}, ${numero}${complemento}`, margin, y, contentWidth * 0.65);
  drawField('BAIRRO / DISTRITO', bairro, margin + contentWidth * 0.65, y, contentWidth * 0.35);
  y += 11;

  // Row 7: CEP & Cidade & UF
  drawField('CEP', cep, margin, y, contentWidth * 0.25);
  drawField('MUNICÍPIO', String(cidade), margin + contentWidth * 0.25, y, contentWidth * 0.55);
  drawField('UF', String(uf), margin + contentWidth * 0.8, y, contentWidth * 0.2);
  y += 11;

  // Row 8: Contatos
  drawField('ENDEREÇO ELETRÔNICO (E-MAIL)', email, margin, y, contentWidth * 0.6);
  drawField('TELEFONE', telefone, margin + contentWidth * 0.6, y, contentWidth * 0.4);
  y += 11;

  // Row 9: Situação Cadastral
  drawField('SITUAÇÃO CADASTRAL', situacao.toUpperCase(), margin, y, contentWidth * 0.5);
  drawField('DATA DA SITUAÇÃO CADASTRAL', formatDate(dataSituacao), margin + contentWidth * 0.5, y, contentWidth * 0.5);
  y += 11;

  // Row 10: Simples Nacional & MEI
  const simples = data.simples;
  const isSimplesOptante =
    simples?.simples === true ||
    (typeof simples?.simples === 'string' &&
      (simples.simples.toLowerCase() === 'sim' ||
        (simples.simples.toLowerCase().includes('optante') &&
          !simples.simples.toLowerCase().includes('não optante'))));
  const isMeiOptante =
    simples?.mei === true ||
    (typeof simples?.mei === 'string' &&
      (simples.mei.toLowerCase() === 'sim' ||
        (simples.mei.toLowerCase().includes('sim') && !simples.mei.toLowerCase().includes('não')) ||
        (simples.mei.toLowerCase().includes('enquadrado') && !simples.mei.toLowerCase().includes('não enquadrado'))));

  const simplesText = isSimplesOptante
    ? `OPTANTE${simples?.data_opcao_simples ? ` (Desde ${formatDate(simples.data_opcao_simples)})` : ''}`
    : 'NÃO OPTANTE';
  const meiText = isMeiOptante
    ? `ENQUADRADO SIMEI${simples?.data_opcao_mei ? ` (Desde ${formatDate(simples.data_opcao_mei)})` : ''}`
    : 'NÃO ENQUADRADO';

  drawField('OPÇÃO PELO SIMPLES NACIONAL', simplesText, margin, y, contentWidth * 0.5);
  drawField('OPÇÃO PELO MEI (SIMEI)', meiText, margin + contentWidth * 0.5, y, contentWidth * 0.5);
  y += 13;

  // Quadro Societário (QSA)
  if (socios.length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text(`QUADRO DE SÓCIOS E ADMINISTRADORES (QSA) - TOTAL: ${socios.length}`, margin + 2, y + 4.2);
    y += 7;

    const maxSocios = Math.min(socios.length, 6);
    for (let i = 0; i < maxSocios; i++) {
      const s = socios[i];
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      const name = `${i + 1}. ${s.nome}`;
      doc.text(name, margin + 2, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      const qualif = s.qualificacao_socio?.descricao ? ` (${s.qualificacao_socio.descricao})` : '';
      const dataEnt = s.data_entrada ? ` - Entrada: ${formatDate(s.data_entrada)}` : '';
      doc.text(`${qualif}${dataEnt}`, margin + doc.getTextWidth(name) + 4, y + 4);

      y += 5.5;
    }

    if (socios.length > 6) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`... e mais ${socios.length - 6} sócios registrados no quadro societário.`, margin + 2, y + 3);
      y += 6;
    }
  }

  // Inscrições Estaduais
  if (inscricoes.length > 0) {
    y += 2;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 5.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.text('INSCRIÇÃO ESTADUAL', margin + 2, y + 3.8);
    y += 6.5;

    inscricoes.slice(0, 3).forEach((ie) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(
        `IE: ${ie.inscricao_estadual}  |  UF: ${ie.estado?.sigla || '-'}  |  Status: ${ie.ativo ? 'ATIVA' : 'INATIVA'}`,
        margin + 2,
        y + 3
      );
      y += 5;
    });
  }

  // Footer Notice
  const now = new Date();
  const dateStr = formatDate(now.toISOString(), true);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(
    `Documento emitido eletronicamente via Rampup CNPJ Consult em ${dateStr}. Dados obtidos via API pública da Receita Federal.`,
    margin,
    285
  );

  // Save PDF
  const cleanName = razaoSocial.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  const filename = `CNPJ_${cleanCnpj}_${cleanName}.pdf`;
  doc.save(filename);
}
