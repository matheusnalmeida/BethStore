import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MultiStepForm from '../../components/MultiStepForm'
import { useCarrinho } from '../../hooks/useCarrinho';
import Pedido from '../../models/pedido';
import ClientePedidoStep from './Steps/ClientePedidoStep';
import FormaPagamentoStep from './Steps/FormaPagamentoStep';
import ResumoPedidoStep from './Steps/ResumoPedidoStep';
import { ClientePedidoValid, FormaPagamentoValid } from './StepsValidator/step.validators';
import PedidoService from '../../services/pedido.service'
import { showErrorMessage, showSuccessMessage } from '../../utils/toast.utils';
import { useBlocking } from '../../hooks/useBlocking';

function PedidoForm() {

  const navigate = useNavigate();
  const { cartItems, handleCheckout } = useCarrinho();
  const [pedido, setPedido] = useState(Pedido())
  const { Blocking, Unblocking } = useBlocking();

  const handleFormChange = (evt, mask, extraProperties = {}) => {
    if (!evt) {
      return;
    }
    let value = mask && typeof (mask) === "function"
      ? mask(evt.target.value)
      : evt.target.value;
    setPedido(prevPedido => {
      return {
        ...prevPedido,
        [evt.target.name]: value,
        ...extraProperties
      }
    })
  }

  const handleSubmit = () => {
    Blocking()
    PedidoService.CreatePedido(pedido).then((result) => {
      if (result.success) {
        showSuccessMessage(result.message)
        handleCheckout();
        navigate('/pedido');
        return;
      }
      showErrorMessage(result.message)
    }).finally(() => {
      Unblocking()
    });
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/carrinho')
      return;
    }
    pedido.produtos = cartItems;
  }, [navigate, pedido, cartItems])

  return (
    <MultiStepForm
      onSubmit={handleSubmit}
    >
      <ClientePedidoStep
        key={0}
        label={'Responsável'}
        pedido={pedido}
        handleFormChange={handleFormChange}
        validator={() => ClientePedidoValid(pedido)} />
      <FormaPagamentoStep
        key={1}
        label={'Forma de Pagamento'}
        pedido={pedido}
        handleFormChange={handleFormChange}
        validator={() => FormaPagamentoValid(pedido)} />
      <ResumoPedidoStep
        key={2}
        label={'Resumo'}
        pedido={pedido}
        handleFormChange={handleFormChange} />
    </MultiStepForm>
  )
}

export default PedidoForm