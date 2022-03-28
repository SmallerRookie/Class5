/// <reference types="cypress" />

describe('Login',function(){
    beforeEach('Login by token',function(){
        cy.LoginAPI().then(function(){
            cy.visit("https://cms-lyart.vercel.app/dashboard/manager",
               {  
                    onBeforeLoad : function(window){                          
                    const token = Cypress.env('cms')
                    window.localStorage.setItem('cms', JSON.stringify({
                    userId:3, 
                    role:'manager', 
                    token: token 
                }));
                }
            })    
        })

        cy.get("div[role='button']").eq(2).click()
        cy.get("a[href*=add]").click({force:true})
    })
    
    it('Test1 - Empty form',function(){
        
        cy.get("button[type='submit']").eq(0).click()
        cy.get("div[class$='explain-error']").then(function(size){
            expect(size.length).to.equal(7)
        })
    })

    it('Test2 - Start Date', function(){
        
        cy.get("#startTime").click()
        cy.get("td[class*='disabled']").each(function(e1,index,list){
            cy.get(e1).click({force: true});
            cy.get("#startTime").should("have.text","")
        })
        
    })

    it('Text3 - disable button', function(){
        cy.get("#uid").should("be.disabled")
    })

    it('Test4 - Teacher inputs', function(){
        cy.get("#teacherId").type("b")
        cy.get("div[class^='rc']").should('be.visible')
        
        cy.get("#teacherId").type("b")
        cy.get("div[class^='rc'] div div [class^=ant]").each((e1)=>{
            if(e1.text() == 'Marietta Dibbert'){
                cy.wrap(e1).click({force: true})
            }
        })
        cy.get("[title='Marietta Dibbert']").should('be.visible')
    })

    it('Test5 - Type', function(){
               
        cy.get("div[class*='multiple'] div[class$='selector']").click()
        cy.get(".ant-select-dropdown").should('be.visible')

        cy.get(".ant-select-item").each((e1)=>{
            cy.wrap(e1).click({fales:true})
        })
        cy.get("span[class$='content']").should('have.length.greaterThan',1)

        cy.get("span[class$='content']").should('have.length',10)
        cy.get("svg[data-icon='close']").eq(1).click()
        cy.get("span[class$='content']").should('have.length',9)

    })

    it('Test6 - Price', function(){
        
        cy.get('svg[data-icon="up"]').eq(0).click()
        cy.get('#price').invoke('attr','value').should('eq','$ 1')

        var genArr = Array.from({length:2},(k)=>k)
        cy.wrap(genArr).each((index)=>{
            cy.get('svg[data-icon="down"]').eq(1).click()
        })

        cy.get('#price').invoke('attr','value').should('eq','$ 0')
        cy.get('#price').clear()

        cy.get('#price').type('9007199254740992')
        cy.get('#detail').click()
        cy.get('#price').invoke('attr','value').should('eq','$ 9,007,199,254,740,991')
        cy.get('#price').clear()

        cy.get('#price').type('abc')
        cy.get('#detail').click()
        cy.contains("div[role='alert']","'price' is required").should('be.visible')
    })

    it('Test7 - Description',function(){
          
        var genArr = Array.from({length:99},(k)=>k)
        cy.wrap(genArr).each((index)=>{
            cy.get('#detail').type('1')
        })
        cy.contains("100 - 1000").should('have.text','Description length must between 100 - 1000 characters.')

        cy.get('#detail').type('1')
        cy.contains("div[role='alert']","100-1000").should('not.be.true')
        cy.get('#detail').clear()

        cy.wrap(genArr).each((index)=>{
            cy.get('#detail').type(' ')
        })
        cy.contains("100 - 1000").should('have.text','Description length must between 100 - 1000 characters.')

        cy.get('#detail').type(' ')
        cy.contains("div[role='alert']","100-1000").should('not.be.true')
    })

    it('Test8 - Duration', function(){
        cy.get('span[title="month"]').click()
        cy.get('[title] div').should('have.length',5)
    })

    it('Test-9 file upload',function(){
        
        cy.get('span p').should('have.text','Click or drag file to this area to upload')
        cy.get("input[type='file']").attachFile("html-xxl.png")
        cy.get('.ant-modal-footer > .ant-btn-primary').click()
        cy.get('span p').should('not.be.true')
    })

    it('Test-10 End to End', function(){
        cy.get('#name').type("Testing")
        cy.get("#startTime").click()
        cy.get("[class*='today-btn']").click()
        cy.get("#price").type("5000")
        cy.get('[aria-valuemax="10"]').type('10')
        cy.get('.ant-input-group>.ant-input-number>.ant-input-number-input-wrap>.ant-input-number-input').type('6')
        cy.get('#teacherId').type("Ander")
        cy.get("div[title='Sim Anderson']").click()
        cy.get("div[class*='multiple'] div[class$='selector']").click()
        cy.contains('Python').click()
        var genArr = Array.from({length:10},(k)=>k)
        cy.wrap(genArr).each((index)=>{
            cy.get('#detail').type('HiHiHiHiHi')
        })
        cy.get("input[type='file']").attachFile("html-xxl.png")
        cy.get('.ant-modal-footer > .ant-btn-primary').click()
        cy.contains('Create Course').click()
    })
})


