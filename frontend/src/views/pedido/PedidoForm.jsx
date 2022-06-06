import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MultiStepForm from '../../components/MultiStepForm'
import { useCarrinho } from '../../hooks/useCarrinho';
import Pedido from '../../models/pedido';
import ClientePedidoStep from './Steps/ClientePedidoStep';
import FormaPagamentoStep from './Steps/FormaPagamentoStep';
import ResumoPedidoStep from './Steps/ResumoPedidoStep';
import { ClientePedidoValid } from './StepsValidator/step.validators';

function PedidoForm() {

  const navigate = useNavigate();
  const { cartItems } = useCarrinho();
  const [pedido, setPedido] = useState(Pedido())

  const handleFormChange = (evt, mask) => {
    let value = mask && typeof(mask) === "function" 
    ? mask(evt.target.value) 
    : evt.target.value;
    setPedido(prevPedido => {
      return {
        ...prevPedido,
        [evt.target.name]: value,
      }
    })
  }

  const steps = useRef([
    <ClientePedidoStep 
      key={0} 
      label={'Responsável'} 
      pedido={pedido}
      handleFormChange={handleFormChange}
      validator={() => ClientePedidoValid(pedido)}/>,
    <FormaPagamentoStep key={1} label={'Forma de Pagamento'} />,
    <ResumoPedidoStep key={2} label={'Resumo'} />
  ]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/carrinho')
    }
  }, [navigate, cartItems.length])

  return (
    <MultiStepForm
      children={steps.current}
    >

    </MultiStepForm>
  )
}

export default PedidoForm