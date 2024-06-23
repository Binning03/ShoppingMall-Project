import { Button, Dropdown, DropdownItem } from "flowbite-react";
//import { ButtonGroup } from "flowbite-react"; occur error

const CategoryList = () => {
  return (
      <span className="flex justify-center">
        <Button color="gray"><a href="/category/1">TOP</a></Button>
        <Button color="gray"><a href="/category/2">OUTER</a></Button>
        <Button color="gray"><a href="/category/3">SHIRTS</a></Button>
        <Button color="gray"><a href="/category/4">PANTS</a></Button>
        <Dropdown label="ETC" color="gray">
          <DropdownItem><a href="/category/5">HAT</a></DropdownItem>
          <DropdownItem><a href="/category/6">BAG</a></DropdownItem>
          <DropdownItem><a href="/category/7">SHOES</a></DropdownItem>
        </Dropdown>
      </span>
  );
};

export default CategoryList;