import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ProductInformation from '../containers/ProductDetails/ProductInformation'
import { BrowserRouter } from 'react-router-dom'

test('Displays all content correctly', async () => {

    const product = { "id": 1, "name": "Champion Women's Plus Size Powerblend Logo Graphic Hoodie", "rating": 4, "price": 99.99, "old_price": 129.99, "images": ["https://i5.walmartimages.com/asr/bb72bcf3-5120-4ae5-808e-cb89e3763a83_1.fd5168c05fcd77727a1229d57c1ba7aa.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/423e8fff-6a89-450d-b5bb-86d041d44f1f_1.012bf5382d5baa130bc4d6c5d86b3f28.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/0c0d8c54-ee4b-481e-a1f1-b7223e1c41d5_1.5d538d8e3c007df2bb3fa113583b546e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/ff31720c-27e6-4895-983f-8d2d0ebb5054_1.41134f3bb9b61513f25e3f2bc499c924.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"], "colors": ["Red", "Blue", "Yellow", "Green", "White", "Brown", "Black"], "sizes": ["1x", "2x", "3x", "4x"] }

    render(<BrowserRouter><ProductInformation product={product} /></BrowserRouter>)

    // ACT
    // await userEvent.click(screen.getByText('Load Greeting'))
    // await screen.findByRole('heading')

    // ################### ASSERT ###########################
    // Product Name
    expect(screen.getByTestId('pd-name')).toBeInTheDocument()
    expect(screen.getByTestId('pd-name')).toHaveTextContent("Champion Women's Plus Size Powerblend Logo Graphic Hoodie")

    // Product Price
    expect(screen.getByTestId('pd-price')).toBeInTheDocument()
    expect(screen.getByTestId('pd-price')).toHaveTextContent("NOW $99.99")

    // Product OLD Price
    expect(screen.getByTestId('pd-old-price')).toBeInTheDocument()
    expect(screen.getByTestId('pd-old-price')).toHaveTextContent("$129.99")

    // Colors
    expect(screen.getByTestId('color-options')).toBeInTheDocument()
    expect(screen.getByTestId('selected-color')).toHaveTextContent("Red")

    // Sizes
    expect(screen.getByTestId('size-options')).toBeInTheDocument()
    expect(screen.getByTestId('selected-size')).toHaveTextContent("1x")
})

test('Displays conditional eliments correctly', async () => {

    const product = { "id": 1, "name": "Champion Women's Plus Size Powerblend Logo Graphic Hoodie", "rating": 4, "price": 99.99, "old_price": 129.99, "images": ["https://i5.walmartimages.com/asr/bb72bcf3-5120-4ae5-808e-cb89e3763a83_1.fd5168c05fcd77727a1229d57c1ba7aa.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/423e8fff-6a89-450d-b5bb-86d041d44f1f_1.012bf5382d5baa130bc4d6c5d86b3f28.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/0c0d8c54-ee4b-481e-a1f1-b7223e1c41d5_1.5d538d8e3c007df2bb3fa113583b546e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/ff31720c-27e6-4895-983f-8d2d0ebb5054_1.41134f3bb9b61513f25e3f2bc499c924.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"] }

    render(<BrowserRouter><ProductInformation product={product} /></BrowserRouter>)

    // ACT
    // await userEvent.click(screen.getByText('Load Greeting'))
    // await screen.findByRole('heading')

    // ################### ASSERT ###########################
    // Product Name
    expect(screen.getByTestId('pd-name')).toBeInTheDocument()
    expect(screen.getByTestId('pd-name')).toHaveTextContent("Champion Women's Plus Size Powerblend Logo Graphic Hoodie")

    // Product Price
    expect(screen.getByTestId('pd-price')).toBeInTheDocument()
    expect(screen.getByTestId('pd-price')).toHaveTextContent("NOW $99.99")

    // Product OLD Price
    expect(screen.getByTestId('pd-old-price')).toBeInTheDocument()
    expect(screen.getByTestId('pd-old-price')).toHaveTextContent("$129.99")


    // ############ Product does not contain color or size options ###############

    // Colors
    expect(screen.queryByText('Color: ')).not.toBeInTheDocument()

    // Sizes
    expect(screen.queryByText('Size: ')).not.toBeInTheDocument()
})