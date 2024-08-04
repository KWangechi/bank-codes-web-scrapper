import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((item, index) => (
          <div
            key={index}
            className="grow rounded-lg w-10/12 md:w-11/12 mx-auto shadow-lg bg-gray-50 p-6 shadow-[#695958]-500/40 mb-6 w-full"
          >
            <div className="flex items-center mb-4">
              <Skeleton circle={true} height={64} width={64} />
              <div className="ml-4 flex-grow">
                <Skeleton height={24} width="60%" />
                <div className="flex items-center text-gray-600">
                  <Skeleton height={20} width="40%" />
                  <span className="mx-2">•</span>
                  <Skeleton height={20} width="20%" />
                </div>
              </div>
              <div className="flex text-right">
                <Skeleton height={24} width="40%" />
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="40%" />
                </div>
                <div className="text-right">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={20} width="60%" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-4 mt-4">
                <div>
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="60%" />
                </div>
                <div>
                  <Skeleton height={20} width="40%" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonCard;
