const result_amount = json.result_amount;
const status = json.status;
if (status == 'COMPLETED') {
  if (param == 'objDolarMep1' && meplinkeado == 'Vender Dólar MEP') {
    user.set('dMEP_resultadoPata1', json.result_amount);
    result.text(`Procesando operación`);
    result.done();
  } else if (
    param == 'objDolarMep1' &&
    meplinkeado == 'Comprar Dólar MEP'
  ) {
    result.text(`Compra de bono realizada, veras tus dolares mañana`);
    result.done();
  } else if (param == 'objDolarMep2' && meplinkeado == 'Vender Dólar MEP') {
    user.get('dMEP_resultadoPata1');
    result.text(
      `Dolares vendidos ${dMEP_resultadoPata1}, pesos recibidos ${result_amount}`
    );
    result.done();
  }
}
user.set('estadoOrden', status);
result.done();