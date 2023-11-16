import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
  Select,
} from "antd";
import { useParams } from "react-router-dom";

function Products() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");
  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);

  const getSortedItems = (selOrder) => {
    if (selOrder === "az") {
      const sortedItems = [...items].sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      setItems(sortedItems);
      console.log(
        sortedItems.map((item) => {
          return item.title;
        })
      );
    } else if (selOrder === "za") {
      const sortedItems = [...items].sort((a, b) =>
        a.title > b.title ? -1 : 1
      );
      setItems(sortedItems);
      console.log(
        sortedItems.map((item) => {
          return item.title;
        })
      );
    }
  };

  if (loading) {
    return <Spin spinning={loading} fullscreen="true" />;
  }

  return (
    <div>
      <div className="sortContainer">
        <Typography.Text>View Items Sorted By:</Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
            getSortedItems(value);
          }}
          options={[
            {
              label: "Alphabetically a-z",
              value: "az",
            },
            {
              label: "Alphabetically z-a",
              value: "za",
            },
            {
              label: "Price Low to High",
              value: "lowHigh",
            },
            {
              label: "Price High to Low",
              value: "highLow",
            },
          ]}
          defaultValue="az"
        ></Select>
      </div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={product.discountPercentage}
              color="pink"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      className="itemDesc"
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

function AddToCartButton({ item }) {
  const [loading, setLoading] = useState(false);

  const addProductToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };

  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
    >
      Add to Cart
    </Button>
  );
}

export default Products;
