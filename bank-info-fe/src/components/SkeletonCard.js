import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg bg-white p-6 mb-6 w-full mx-auto"
          >
            {/* TOP ROW: Logo + Branch Title + Status */}
            <div className="flex items-start justify-between mb-4">
              {/* Logo + Name */}
              <div className="flex items-center">
                <Skeleton circle height={48} width={48} />

                <div className="ml-4">
                  {/* Branch Name */}
                  <Skeleton height={20} width={180} />
                  {/* Branch Code */}
                  <Skeleton height={16} width={120} />
                </div>
              </div>

              {/* Status */}
              <div className="text-right gap-y-2 flex flex-col">
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={70} />
                
              </div>
            </div>

            <div className="border-t border-gray-200 my-4" />

            {/* BANK DETAILS + WORKING HOURS */}
            <div className="flex justify-between gap-6 mb-4">
              {/* Left Side */}
              <div className="flex-1">
                {/* Bank Name */}
                <Skeleton height={20} width={220} />
                {/* Bank Code */}
                <Skeleton height={14} width={120} className="mt-2" />{" "}
                {/* Swift Code */}
                <Skeleton height={14} width={180} className="mt-2" />{" "}
              </div>

              {/* Right Side: Working Hours */}
              <div className="text-right flex-1">
                <Skeleton height={14} width={150} />
                <Skeleton height={14} width={150} className="mt-2" /> 
                <Skeleton height={14} width={150} className="mt-2" />
                <Skeleton height={14} width={200} className="mt-2" />
              </div>
            </div>

            <div className="border-t border-gray-200 my-4" />

            {/* CONTACT INFO */}
            <div className="flex gap-10">
              <div className="flex-1">
                {/* Phone */}
                <Skeleton height={16} width={180} />
                <Skeleton height={16} width={160} className="mt-2" />{" "}
                {/* Email */}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonCard;
