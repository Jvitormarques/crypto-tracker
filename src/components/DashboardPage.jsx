import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import ModalNote from './ModalNote';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function DashboardPage() {
  const { state, dispatch } = useContext(CryptoContext);
  const [modalCoin, setModalCoin] = useState(null);

  return (
    <Container className="my-4">
      <h1>Favoritos</h1>
      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {state.favorites.map((coin) => (
          <Col key={coin.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-3">
                  {coin.name}{' '}
                  <small className="text-muted">
                    ({coin.symbol.toUpperCase()})
                  </small>
                </Card.Title>
                <Card.Text className="flex-grow-1">
                  💲 <strong>${coin.current_price}</strong>
                  <br />
                  📝 {coin.note || <span className="text-muted">Sem nota</span>}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => setModalCoin(coin)}
                  >
                    Editar/adicionar Nota
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      dispatch({ type: 'REMOVE_FAVORITE', payload: coin.id });
                      dispatch({
                        type: 'SHOW_TOAST',
                        payload: {
                          message: `${coin.name} removido dos favoritos.`,
                          variant: 'danger',
                        },
                      });
                    }}
                  >
                    Remover
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {modalCoin && (
        <ModalNote show coin={modalCoin} onHide={() => setModalCoin(null)} />
      )}
    </Container>
  );
}
