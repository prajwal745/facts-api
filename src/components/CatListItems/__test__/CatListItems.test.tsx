import { screen, render } from '@testing-library/react';
import CatListItems from '../CatListItems';
import { CatsItemsListProps } from '../../../types/cat.types';

describe('DataVisualisation', () => {
    const defaultProps = {
        data: {
            fact: "The biggest wildcat today is the Siberian Tiger. It can be more than 12 feet (3.6 m) long (about the size of a small car) and weigh up to 700 pounds (317 kg)",
            length: 158
        }
    }
    const setup = (props?: CatsItemsListProps) => {
        return render(<CatListItems {...defaultProps} {...props} />)
    }
    test('fetches and displays data', async () => {
        setup();
        expect(screen.getByText(defaultProps.data.fact)).toBeInTheDocument();
        const lengthTypo = screen.getByTestId("typography-length-wrapper")
        expect(lengthTypo.textContent).toContain('158');
    });

    test('shows data', async () => {
        setup({data: {fact: "", length: undefined}});
        expect(screen.getByText("No Fact Found")).toBeInTheDocument();
        const lengthTypo = screen.getByTestId("typography-length-wrapper")
        expect(lengthTypo.textContent).toContain('0');
    });
});

