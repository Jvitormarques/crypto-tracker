import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { CryptoContext } from '../contexts/CryptoContext';

export default function CryptoList({ coins }) {
  const { state, dispatch } = useContext(CryptoContext);
  const { favorites } = state;

  const list = useMemo(() => coins || [], [coins]);

  return (
    <Row xs={1} md={2} lg={3} className="g-4 my-4">
      {list.map((coin) => {
        const isFav = favorites.some((f) => f.id === coin.id);
        return (
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
                </Card.Text>
                <Button
                  variant={isFav ? 'secondary' : 'outline-primary'}
                  onClick={() => {
                    dispatch({ type: 'ADD_FAVORITE', payload: { ...coin, note: '' } });
                    dispatch({
                      type: 'SHOW_TOAST',
                      payload: {
                        message: `${coin.name} adicionado aos favoritos!`,
                        variant: 'success',
                      },
                    });
                  }}
                  disabled={isFav}
                  className="mt-auto"
                >
                  {isFav ? 'Favorito' : '⭐ Favoritar'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

CryptoList.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      current_price: PropTypes.number.isRequired,
    })
  ),
};

CryptoList.defaultProps = {
  coins: [],
};
