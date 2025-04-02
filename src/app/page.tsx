'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { NumericFormat } from 'react-number-format';


export default function Home() {
  const [valorInicial, setValorInicial] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
  const [jurosAnual, setJurosAnual] = useState('');
  const [anos, setAnos] = useState('');

  const [resultado, setResultado] = useState<{
    totalDepositado: number;
    totalJuros: number;
    valorFinal: number;
  } | null>(null);

  const formatarReal = (valor: number | string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));

  const calcular = () => {
    const vi = Number(valorInicial);
    const am = Number(aporteMensal);
    const ja = Number(jurosAnual);
    const a = Number(anos);

    if (isNaN(vi) || isNaN(am) || isNaN(ja) || isNaN(a)) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const meses = a * 12;
    const jurosMensal = ja / 12 / 100;

    let montante = vi;
    let totalDepositado = vi;

    for (let i = 0; i < meses; i++) {
      montante *= 1 + jurosMensal;
      montante += am;
      totalDepositado += am;
    }

    const valorFinal = montante;
    const totalJuros = valorFinal - totalDepositado;

    setResultado({ totalDepositado, totalJuros, valorFinal });
  };

  const limpar = () => {
    setValorInicial('');
    setAporteMensal('');
    setJurosAnual('');
    setAnos('');
    setResultado(null);
  };
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <Card>
          <h1 className="text-3xl font-bold text-center mb-6">Simulador de Rendimento Mike</h1>

          <div className="grid gap-4 md:grid-cols-2">
           <NumericFormat
              value={valorInicial}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setValorInicial(values.value)}
              placeholder="Valor Inicial (R$)"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <NumericFormat
              value={aporteMensal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setAporteMensal(values.value)}
              placeholder="Aporte Mensal (R$)"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <Input
              type="number"
              placeholder="Juros Anual (%)"
              value={jurosAnual}
              onChange={(e) => setJurosAnual(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Anos Poupando"
              value={anos}
              onChange={(e) => setAnos(e.target.value)}
            />
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button onClick={calcular} className="w-full md:w-auto text-lg px-6 py-2">
              Calcular
            </Button>
            <Button onClick={limpar} className="w-full md:w-auto text-lg px-6 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400">
              Limpar
            </Button>
          </div>


          {resultado && (
            <div className="mt-8 space-y-4 text-center">
              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-lg font-medium">
                  💰 Valor Depositado: <strong>{formatarReal(resultado.totalDepositado)}</strong>
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <p className="text-lg font-medium">
                  📈 Valor dos Juros: <strong>{formatarReal(resultado.totalJuros)}</strong>
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl">
                <p className="text-lg font-medium">
                  🏆 Valor Total: <strong>{formatarReal(resultado.valorFinal)}</strong>
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
