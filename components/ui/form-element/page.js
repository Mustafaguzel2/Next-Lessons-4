import { Input } from "@/components/ui/input";

function CommonFormElement({ currentItem, value, onChange }) { // Destructure props
    let content = null;

    switch (currentItem.componentType) {
        case 'input':
            content = (
                <Input
                    id={currentItem.name}
                    name={currentItem.name}
                    placeholder={currentItem.placeholder}
                    value={value}
                    onChange={onChange}
                    type={currentItem.type}
                />
            );
            break;
        default:
            content = (
                <Input
                    id={currentItem.name}
                    name={currentItem.name}
                    placeholder={currentItem.placeholder}
                    value={value}
                    onChange={onChange}
                    type={currentItem.type}
                />
            );
            break;
    }
    return content;
}

export default CommonFormElement;

