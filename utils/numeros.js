export function gerarNumeroAleatorioEntre(minimo, maximo, numeroExcluido) {
  const numeroAleatorio = Math.floor(Math.random() * (maximo - minimo)) + minimo;

  if (numeroAleatorio === numeroExcluido) {
    return gerarNumeroAleatorioEntre(minimo, maximo, numeroExcluido);
  }

  return numeroAleatorio;
}
