import React from "react";

const BackgroundLayout = () => {
    return (
        <div
            className="h-screen w-full fixed left-0 top-0 -z-10 overflow-hidden flex items-center justify-center"
            style={{
                backgroundColor: '#8bca84' // Arka plan rengi buraya ekleniyor, burada açık mavi kullanıldı
            }}
        >
            {/* İçerik buraya gelecek */}
        </div>
    );
};

export default BackgroundLayout;
