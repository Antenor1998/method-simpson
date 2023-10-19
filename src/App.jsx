import { useState } from 'react'
import { sqrt, fraction, multiply, add, parse, bignumber, sum, index, pow, cos } from 'mathjs'
import './App.css'
import { Card, CardBody, Table, Input, Button, CardFooter } from '@nextui-org/react'
import { BlockMath, InlineMath } from 'react-katex'
import katex from 'katex';
import 'katex/dist/katex.min.css';

function App() {
  const [funB, setFunB] = useState('5');
  const [funA, setFunA] = useState('2');
  const [iteraciones, setIteraciones] = useState(9);
  const [tabla, setTabla] = useState([]);
  const [resp, setResp] = useState("y = 0");
  const [formula, setFormula] = useState('x^2 * log(x)');
  const init = `\\begin{equation} y = \\int_{${funA}}^{${funB}} `;
  const formulaFin = `${init} ${formula} \\end{equation}`;
  const [userFormula, setUserFormula] = useState(formulaFin);

  const handleFormulaChange = (event) => {
    setFormula(event.target.value);
    const fun1 = `\\begin{equation} y = \\int_{${funA}}^{${funB}} `;
    const newFormula = `${fun1} ${event.target.value} \\end{equation}`;
    setUserFormula(newFormula);
  };

  const handleUpdateFormulaB = (event) => {
    setFunB(event.target.value)
    const fun1 = `\\begin{equation} y = \\int_{${funA}}^{${event.target.value}} `;
    const newFormula = `${fun1} ${formula} \\end{equation}`;
    setUserFormula(newFormula);
  };

  const handleUpdateFormulaA = (event) => {
    setFunA(event.target.value)
    const fun1 = `\\begin{equation} y = \\int_{${event.target.value}}^{${funB}} `;
    const newFormula = `${fun1} ${formula} \\end{equation}`;
    setUserFormula(newFormula);
  };

  const calcular = () => {
    const beta = (funB - funA)
    const obj = [];
    const deltaX = fraction('1/3');
    const resultadoFraccion = fraction(beta, 9);
    const resultadoFraccion2 = multiply(resultadoFraccion, deltaX);
    console.log(resultadoFraccion);
    console.log(resultadoFraccion2);
    console.log(beta);

    for(let x = 0 ; x <= iteraciones; x++){
      if(x === 0 ){
        obj.push(fraction(funA));
      }else {
        const resp = sum(obj[x -1], resultadoFraccion)
        obj.push(resp);
      }
    }

    setTabla(obj);
    console.log(obj)
    let sumImpar = 0
    const resultadosIMp = [];
    const resultadosPar = [];
    let sumPar = 0

    obj.map( (x, index) => {
      cos
      if(index !== 0 && index !== iteraciones){    
        const scope = {
          x: Number(x).toFixed(4) , // Cambia el valor de 'x' según lo que desees evaluar
        };
  
        const expresionMatematica = parse(formula);
        // Evalúa la expresión en el valor de 'x';
        const compilada = expresionMatematica.compile();
        const resultado = compilada.evaluate(scope);
        console.log(Number(resultado).toFixed(4))
        if(index % 2 !== 0) {
          resultadosIMp.push(Number(resultado).toFixed(4));
        }else{
          resultadosPar.push(Number(resultado).toFixed(4));
        }
      }
    })
    sumImpar = Number(sum(resultadosIMp)).toFixed(4);
    sumPar = Number(sum(resultadosPar)).toFixed(4);

    let numms = []
    let sumaNums = 0
    const nums = obj.filter((x, index) => index === 0 || (index) === (iteraciones))

    nums.map( x => {
      const scope = {
        x: Number(x).toFixed(4) , // Cambia el valor de 'x' según lo que desees evaluar
      };
      // console.log(Number(x).toFixed(4));
  
      const expresionMatematica = parse(formula);
      // Evalúa la expresión en el valor de 'x';
      const compilada = expresionMatematica.compile();
      const resultado = compilada.evaluate(scope);
      // console.log(Number(resultado).toFixed(4));
      numms.push(Number(resultado).toFixed(4));
    })

    sumaNums = Number(sum(numms)).toFixed(4);

    const resps = multiply(Number(resultadoFraccion2), sum(sumaNums,sum(multiply(2, sumPar), multiply(4, sumImpar))))
    const numero = Number(resps).toFixed(4);
    setResp(`y = ${numero}`)

  }


  return (
    <div className="flex">
      <div className="basis-1/2 p-4">
        <Card>
          <CardBody>
            <div className='flex h-auto mb-4'>
              <Input className='flex-auto' label="a" type='text' variant='flat'  placeholder='Introduzca la variable a'  value={funA}   onChange={handleUpdateFormulaA}/>
            </div>
            <div className='flex h-auto mb-4'>
              <Input className='flex-auto' label="b" type='text' variant='flat'  placeholder='Introduzca la variable b' value={funB}   onChange={handleUpdateFormulaB}/>
            </div>
            <div className='flex h-auto mb-4'>
              <Input className='flex-auto' label="Fórmula" type="text" variant='flat'  placeholder='Ingrese su fórmula'  value={formula}  onChange={handleFormulaChange}/>
            </div>

            <div className='flex h-auto mb-4'>
              <Input className='flex-auto' label="interacciones" type='number' variant='flat'  placeholder='Numero de interacciones'  value={iteraciones} onValueChange={setIteraciones}/>
            </div>
          </CardBody>
          <CardFooter>
            <Button color="success" onClick={calcular}>
              Success
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="p-4 flex flex-col">
        <div className='h-auto  mb-4'>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 w-[610px] inline-block" shadow="sm">
          <CardBody className=''>
                {/* <InlineMath math="y = \frac{a}{b} \times \sqrt{c + d}" /> */}
                <BlockMath math={userFormula} />
          </CardBody>
        </Card>
        </div>
        <div className='h-auto p '>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 w-[610px] inline-block" shadow="sm">
          <CardBody className=''>
                {/* <InlineMath math="y = \frac{a}{b} \times \sqrt{c + d}" /> */}
                <BlockMath math={resp} />
          </CardBody>
        </Card>
        </div>
      </div>

      <div className="p-4 basis-full">
      <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 w-[610px] inline-block" shadow="sm">
          <CardBody className=''>
                {/* <InlineMath math="y = \frac{a}{b} \times \sqrt{c + d}" /> */}
                {
                  tabla.map((x,index) => (
                    <div key={index}>
                    <BlockMath math={`x_{${index}}  = \\frac{${x.n}}{${x.d}}`} />
                    </div>
                  ))
                }
                {/* <BlockMath math={resp} /> */}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default App
