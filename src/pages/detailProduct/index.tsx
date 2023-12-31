import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  Divider, InputNumber, Rate, Segmented } from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { valueType } from "antd/es/statistic/utils";
import CoverPage from "../../components/CoverPage";
import { appApi } from "../../api/appApi";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState<valueType | null>(1);
  const [currentImage, setCurrentImage] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const {data} = await appApi.detailFood(id ? Number(id) : 1)
      setProduct(data)
    }
    fetchData()
  }, []);

  if (product !== null) {
    return (
      <article>
        <CoverPage
          title="Shop Detail"
          currentPage={product.name}
          listPath={[
            { title: "Home", path: "/" },
            { title: "Shop", path: "/shop" },
          ]}
        />
  
        <section className="flex flex-row justify-between max-lg:flex-col max-lg:gap-y-10">
          <div className="grid grid-cols-4 grid-rows-3 gap-4 basis-[45%] grid-flow-col h-[700px] max-lg:gap-3">
            {[...product.images, {imageId: product.featuredImageId}].map((item: any, index: number) => {
              return (
                index !== currentImage && (
                  <img
                    src={item.imageId}
                    alt=""
                    className="h-full w-full bg-contain"
                    onClick={() => setCurrentImage(index)}
                  />
                )
              );
            })}
            <img
              src={[...product.images, {imageId: product.featuredImageId}][currentImage].imageId}
              alt=""
              className="row-span-3 col-span-3 h-full w-full bg-cover"
            />
          </div>
  
          <div className="basis-[50%] grow-0">
            <div className="flex items-center justify-between">
              {product.quantity > 0 ? (
                <div className="bg-primary text-white px-6 mb-2 rounded-md py-2 inline-block">
                  In stock
                </div>
              ) : (
                <div className="bg-disabledGreen text-white px-6 mb-2 rounded-md py-2 inline-block">
                  Out of stock
                </div>
              )}
              {/* <div className="flex gap-5">
                <p className="text-[#828282]">
                  <ArrowLeftOutlined /> Prev
                </p>
                <p className="text-[#828282]">
                  Next <ArrowRightOutlined />
                </p>
              </div> */}
            </div>
  
            <p className="font-bold text-5xl text-[#333] pb-6 max-lg:text-3xl">
              {product.name}
            </p>
  
            <p className="text-lg text-[#4f4f4f]">{product.introduction}</p>
  
            <Divider />
  
            <p className="font-bold text-[32px] text-[#333]">
              {product.currentPrice}.00$
            </p>
  
            <div className="flex items-center gap-3">
              <Rate defaultValue={product.rating} className="text-primary" />
              <Divider type="vertical" className="h-1" />
              <p>{product.rating} Rating</p>
              <Divider type="vertical" className="h-5" />
              <p>{product.qtyReview} Reviews </p>
            </div>
  
            <p className="mt-5 text-[#333] text-lg">Dictum/cursus/Risus</p>
  
            <div className="mt-6">
              <InputNumber
                addonBefore={
                  <div
                    className=" w-[50px] h-[50px] flex items-center justify-center"
                    onClick={() =>
                      Number(qty) > 1 && setQty((prv) => Number(prv) - 1)
                    }
                  >
                    -
                  </div>
                }
                addonAfter={
                  <div
                    className=" w-[50px] h-[50px] flex items-center justify-center"
                    onClick={() => setQty((prv) => Number(prv) + 1)}
                  >
                    +
                  </div>
                }
                min={1}
                onChange={(value) => setQty(value)}
                value={qty}
                controls={false}
                className="overide-input--qty-detail mr-4"
              />
              {/* <Button
                icon={<ShoppingCartOutlined />}
                type="primary"
                className="bg-primary rounded-none h-[50px]"
                onClick={handleAddMultipleProduct}
              >
                Add to cart
              </Button> */}
            </div>
  
            <Divider />
  
            {/* <div className="flex gap-5 mb-2 text-[#4f4f4f] text-lg">
              <p className="flex items-center gap-x-2">
                <HeartOutlined /> Add to wishlist
              </p>
              <p className="flex items-center gap-x-2">
                <InteractionOutlined /> Compare
              </p>
            </div> */}
            <p className="mb-2 text-lg">
              Catagory: <span className="text-[#4f4f4f]">{product.category.name}</span>
            </p>
            {/* <p className="mb-6 text-lg">
              Tag: <span className="text-[#4f4f4f]">Our Shop</span>
            </p> */}
            <p className="text-lg text-[#333] flex items-center">
              Share:
              <span className="text-white gap-3 flex ml-3">
                <YoutubeFilled className="bg-black p-[6px] rounded-full" />
                <FacebookFilled className="bg-black p-[6px] rounded-full" />
                <TwitterOutlined className="bg-black p-[6px] rounded-full" />
                <InstagramFilled className="bg-black p-[6px] rounded-full" />
              </span>
            </p>
            <Divider />
          </div>
        </section>
  
        <section className="pt-5">
          <Segmented
            options={["Description"]}
            className="overide-segmented--detail bg-white mb-8 h-[50px]"
          />
          <div>
            <p>
            {product.introduction}
            </p>
            <p>
            {product.description}

            </p>
          </div>
        </section>
  
        {/* <section className="mt-24">
          <p className="font-bold text-3xl mb-8">Similar Product</p>
  
          <div className="flex justify-between mb-32 gap-x-10 max-lg:grid max-lg:grid-cols-1  ">
            <ItemFood id={String(Number(id) + 1 < 10 ? Number(id) + 1 : 1)} />
            <ItemFood id={String(Number(id) + 2 < 10 ? Number(id) + 2 : 2)} />
            <ItemFood id={String(Number(id) + 3 < 10 ? Number(id) + 3 : 3)} />
            <ItemFood id={String(Number(id) + 4 < 10 ? Number(id) + 4 : 4)} />
            <ItemFood id={String(Number(id) + 5 < 10 ? Number(id) + 5 : 5)} />
          </div>
        </section> */}
      </article>
    );
  }

};

export default DetailProduct;
