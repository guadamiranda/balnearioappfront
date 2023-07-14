
import LittleABMTemplate from "@/Components/templates/littleAbmTemplate/LittleABMTemplate";
import style from './ABMPrice.module.scss'
import Table from "@/Components/Atoms/Table/Table";

const ABMPrice = () => {
    const columns = ["Nombre", "Precio"]
    const data = [{name: 'Precio por Persona', price: 1000},
                  {name: 'Precio por Día', price: 2000 },
                  {name: 'Precio por Persona', price: 1000},
                  {name: 'Precio por Día', price: 2000 },
                  {name: 'Precio por Persona', price: 1000},
                  {name: 'Precio por Día', price: 2000 }]

    return (
        <LittleABMTemplate title="Administración de Precios" subTitle="">
            <div className={style.abmPriceContainer}>
                <Table columns={columns} tableData={data}/>
            </div>
        </LittleABMTemplate>
    );
};

export default ABMPrice;
