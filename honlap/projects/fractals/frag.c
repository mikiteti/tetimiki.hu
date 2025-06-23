precision mediump float;

varying vec2 pos;

uniform vec2 u_size;
uniform float scale;
uniform int u_max;
uniform vec2 center;

float remap( float minval, float maxval, float curval )
{
    return ( curval - minval ) / ( maxval - minval );
}

const float number_of_colors = 5.;
// const vec3 col1 = vec3(0.675,0.878,0.945);
// const vec3 col2 = vec3(0.345,0.518,0.757);
// const vec3 col3 = vec3(0.584,0.231,0.486);
// const vec3 col4 = vec3(0.675,0.855,0.49);
// const vec3 col5 = vec3(0.298,0.765,0.608);

// const vec3 col1 = vec3(0.396,0.404,0.561);
// const vec3 col2 = vec3(0.671,0.741,0.749);
// const vec3 col3 = vec3(0.663,0.749,0.824);
// const vec3 col4 = vec3(0.729,0.769,0.333);
// const vec3 col5 = vec3(0.663,0.667,0.325);

const vec3 col1 = vec3(0.314,0.361,0.549);
const vec3 col2 = vec3(1.000,1.000,1.000);
const vec3 col3 = vec3(0.647,0.557,0.796);
const vec3 col4 = vec3(0.855,0.925,0.729);
const vec3 col5 = vec3(0.831,0.549,0.549);


void main() {
    vec3 col = vec3(0., 0., 0.);
    vec2 z0 = (pos-.5) * u_size * scale + center;
    vec2 z2 = vec2(0., 0.);

    bool inside = true;
    const int max = 100000;
    float w = 0.;
    for (int i = 0; i < max; ++i) {
        if (z2.x + z2.y < 4.) {
            float x = z2.x - z2.y + z0.x;
            float y = w - z2.x - z2.y + z0.y;
            z2.x = x*x;
            z2.y = y*y;
            w = (x+y)*(x+y);
        } else {
            vec2 preserve = z2;
            for (int j = 0; j < 4; ++j) {
                float x = z2.x - z2.y + z0.x;
                float y = w - z2.x - z2.y + z0.y;
                z2.x = x*x;
                z2.y = y*y;
                w = (x+y)*(x+y);
            }
            float phi = log(z2.x + z2.y) * pow(2., -4.);


            float log_zn = log(preserve.x + preserve.y - phi) * .5;
			float nu = log(log_zn);
			float u = mod((float(i + 1) - nu) / float(u_max) * 20., 1.);

            // float u = (float(i) - (25. * floor(float(i)/25.))) / 25.;

            // float u = mod(pow(pow(float(i)/float(u_max), 0.75)*number_of_colors, 1.5), 1.);

            if( u < 1./number_of_colors )
                col = mix(col1, col2, remap( 0., 1./number_of_colors, u ) );
            else if (u < 2./number_of_colors)
                col = mix(col2, col3, remap( 1./number_of_colors, 2./number_of_colors, u ) );
            else if (u < 3./number_of_colors)
                col = mix(col3, col4, remap( 2./number_of_colors, 3./number_of_colors, u ) );
            else if( u < 4./number_of_colors)
                col = mix(col4, col5, remap( 3./number_of_colors, 4./number_of_colors, u ) );
            else 
                col = mix(col5, col1, remap( 4./number_of_colors, 5./number_of_colors, u ) );


    		// float log_zn = log(z2.x + z2.y) * .5;
			// float nu = log(log_zn * 3.32192809489) * 3.32192809489;
			// float brightness = (float(i + 1) - nu) / float(u_max) * 20.;
            // col = vec4(0., brightness, 1. - brightness, 1.);
            break;
        }

        if (i > u_max) {
            break;
        }
    }


    gl_FragColor = vec4(col, 1.0);
}
