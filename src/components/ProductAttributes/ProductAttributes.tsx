import styled, { css } from 'styled-components';
import { ProductType } from '../../types/product';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const formatKey = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const formatValue = (key: string, value: string | string[] | number) => {
  if (Array.isArray(value)) {
    return value.map((item) => capitalize(item)).join(', ');
  }
  if (typeof value === 'string') {
    return capitalize(value);
  }
  if (typeof value === 'number') {
    return key === 'maxWeight' ? `${value} kg` : `${value} cm`;
  }
};

const ProductAttributes = ({ product }: { product: ProductType }) => {
  const { filters } = product;

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Attribute</Th>
            <Th>Value</Th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filters).map(([key, value]) => (
            <Tr key={key}>
              <Td>{formatKey(key)}</Td>
              <Td>{formatValue(key, value)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

const cellStyles = css`
  padding: ${({ theme }) => theme.space[1]};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  max-width: 400px;
  margin: ${({ theme }) => theme.space[0]} auto;
  border-collapse: collapse;
`;

const Th = styled.th`
  ${cellStyles}
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Td = styled.td`
  ${cellStyles}
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

export default ProductAttributes;
