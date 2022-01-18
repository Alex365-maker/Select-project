import { MultipleSelect } from './components';
import './style.scss';

let SelectText: string = "[A] - Продукция сельского хозяйства, лесного хозяйства рыбоводства и рыболовства"
let count: number = 2;
const DefaultText: string = 'Код ОКРБ или наименование закупаемой продукции'
let document_style = document.documentElement.style;
let arr2: any = [];

/** Customer **/

const customerSelect = document.querySelector<HTMLSelectElement>(
    'select[name="customer"]'
);

const customerDiv = document.querySelector<HTMLDivElement>(
    'div[name="blockButton"]'
);


const customerButton = document.querySelector<HTMLInputElement>(
    'input[name="btn"]'
);

const customerResetButton = document.querySelector<HTMLInputElement>(
    'input[name="reset"]'
);

new MultipleSelect(customerSelect, {
    onChange: (selectedOptions) => {
        console.log('customerSelect -> selectedOptions:', selectedOptions);
    },
});

function reset() {
    const arr = customerSelect?.getElementsByTagName("OPTION")
    arr2 = [];
    if (arr)
        for (let i = arr?.length - 1; i >= 0; i--) {
            if (typeof (arr[i].getAttribute('selected')) == 'string') {
                arr2.push(arr[i].getAttribute('value'))
            }
        }
    arr2.map((e: number) => {
        customerSelect?.options[e - 10].removeAttribute('selected')
    })
    customerDiv?.classList.toggle("boxButton_active")
    customerSelect?.classList.toggle('multiple_select_active');
    customerSelect?.classList.add('multiple_select_default');
    count = 0;
    document_style.setProperty('--text', "'" + DefaultText + "'");
    document.querySelector("input")?.setAttribute('value', '' + count)
    return arr2
}

customerResetButton?.addEventListener('click', () => {
    reset()

})

customerButton?.addEventListener('click', () => {
    alert("Выбраны следующие элементы - " + reset())
})

customerSelect?.addEventListener('click', function (event) {
    const TG = event.target as HTMLSelectElement;
    if (TG.tagName !== "OPTION") {
        customerDiv?.classList.toggle("boxButton_active")
        this.classList.toggle('multiple_select_active');
        return;
    }
    customerSelect?.classList.remove('multiple_select_default');
    event.preventDefault();
    const clickOption = this.options[customerSelect.selectedIndex];
    typeof (clickOption.getAttribute('selected')) == 'string' ?
        clickOption.removeAttribute("selected") :
        clickOption.setAttribute('selected', 'selected')

    var document_style = document.documentElement.style;
    count = 0;
    for (let i = customerSelect.options.length - 1; i >= 0; i--) {
        if (typeof (this.options[i].getAttribute('selected')) == 'string') {
            SelectText = this.options[i].text
            count++;
        }
    }
    document.querySelector("input")?.setAttribute('value', '' + count)
    if (!count) {
        SelectText = DefaultText;
        customerSelect.style.border = 'hidden'
    } else {
        customerSelect.style.border = ''
    }
    document_style.setProperty('--text', "'" + SelectText + "'");
});

/** Region **/

const regionSelect = document.querySelector<HTMLSelectElement>(
    'select[name="region"]'
);

new MultipleSelect(regionSelect, {
    onChange: (selectedOptions) => {
        console.log('regionSelect -> selectedOptions:', selectedOptions);
    },
});

regionSelect?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;

    console.log('regionSelect -> value:', target.value);
});
