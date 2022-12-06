import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { Products } from './Dashboard';

describe("Checks the Dashboard UI",()=>{
    afterEach(cleanup);

    // it("has a buy button",()=>{
    //     render(<Dashboard />)
    //     const buybtn = screen.getByTestId("buy-btn");
    //     expect(buybtn).toBeInTheDocument();
    // }); // can't test a hidden button

    it("has a cart button",()=>{
        render(<Dashboard />)
        const cart=screen.getByTestId("cart-btn");
        expect(cart).toBeInTheDocument();
    }) // passed

    // it("has a buy button", ()=>{
    //     render(<Dashboard />)
    //     const buy =screen.getByTestId("buy-btn", {name: /BUY/i,hidden:true });
    //     expect(buy).toHaveClass(buyItem);
    // }) //not sure how to test hidden buttons

    // it("Checks the number of products in the dashboard",()=>{
    //     render(<Dashboard />)
    //     expect(screen.findByText('bohemian dreams - light red')).toBeInTheDocument();
    //     expect(screen.getByTestId('prodcuts').length).toBe(4);
    // }) //not sure pako ani

    it("checks for the buy button",async()=>{
        render(<Dashboard />)
        await waitFor(()=>screen.getByTestId('buy-btn', {name: /BUY/i, hidden:true}));
    })
})