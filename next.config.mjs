/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: [
            "i.ibb.co"
        ]
    },
    experimental:{
        fontLoaders:[
            {loader:'@next/font/google', options:{subsets:['latin']}}
        ],
    },
};

export default nextConfig;
