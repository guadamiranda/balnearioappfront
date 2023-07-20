import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import dropdownStyle from './dropdown.module.scss'
import { useState, useEffect } from 'react'

type Option = {
    name: string,
}

interface IDropdown {
    title: string,
    options: Array<Option>,
    titleDropdown: string,
    selectedValueFunction: (name:string) => void
}

const Dropdown: React.FC<IDropdown> = ({ title, options, titleDropdown, selectedValueFunction }) => {
    const className = `${dropdownStyle.dropdown}`
    const classNameTitle = `${dropdownStyle.dropdown} ${dropdownStyle[`dropdown__title`]}`
    const classNameTitleClicked = `${dropdownStyle.dropdown} ${dropdownStyle[`dropdown__title`]} ${dropdownStyle[`dropdown__titleClicked`]}`
    const classNameOptionItem = `${dropdownStyle.dropdown} ${dropdownStyle[`dropdown__optionsHidden`]}`
    const classNameOptionItemClicked = `${dropdownStyle.dropdown} ${dropdownStyle[`dropdown__options`]}`

    const [isOpenDropDown, setIsOpenDropDown] = useState(false)
    const [arrow, setArrow] = useState(<MdArrowDropDown />)
    const [titleClassName, setTitleClassName] = useState(classNameTitle)
    const [optionItemsClassName, setOptionItemClassName] = useState(classNameOptionItem)
    const [selectedValue, setSelectedValue] = useState(title)

    useEffect(() => {
        setArrow(isOpenDropDown === true ? <MdArrowDropDown /> : <MdArrowDropUp />)
        setTitleClassName(isOpenDropDown === true ? classNameTitleClicked : classNameTitle)
        setOptionItemClassName(isOpenDropDown === true ? classNameOptionItemClicked : classNameOptionItem)
    }, [isOpenDropDown])

    const closeAndSelectValue = (option: string) => {
        setSelectedValue(option)
        selectedValueFunction(option)
        setOptionItemClassName(classNameOptionItem)
        setIsOpenDropDown(false)
    }

    return (
        <div className={className}>
            <span className={dropdownStyle.dropdown__titleDropdown}>{titleDropdown}</span>
            <div className={titleClassName} onClick={() => setIsOpenDropDown(!isOpenDropDown)}>
                <div>{selectedValue}</div>
                <div className={dropdownStyle.dropdown__iconArrow}>{arrow}</div>
            </div>
            <div className={optionItemsClassName}>
                {options.map(option => <div className={dropdownStyle.dropdown__options__item} onClick={() => closeAndSelectValue(option.name)}>{option.name}</div>)}
            </div>
        </div>
    )
}

export default Dropdown