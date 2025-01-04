package com.example.demo.securityconfig;
import com.example.demo.Controllers.ApiUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
public class SecurityConfig  {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // Esta no encripta las contraseñas, es solo para demostración.
    }
    @Autowired
    private ApiUser userApi;
    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


                com.example.demo.model.User user = userApi.searchbyUserName(username);
                if (user == null) {

                    throw new UsernameNotFoundException("usuario no encontrado: " + username);

                }

                return org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword())
                        .roles(user.getRol())
                        .build();
            }
        };
    }



    @Bean
    SecurityFilterChain security(HttpSecurity securityy) throws Exception {
        return securityy.csrf().disable()
                .formLogin(form -> form
                        .loginPage("/login")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .permitAll()
                        .defaultSuccessUrl("/user.html", true)
                        .failureUrl("/login?error=true")  // Redirige aquí si hay un error de autenticación
                        .successHandler((request, response, authentication) -> {
                            // Obtener el rol del usuario autenticado
                            String role = authentication.getAuthorities().iterator().next().getAuthority();
                            System.out.println("Rol del usuario autenticado: " + role);

                            // Redirigir a una página según el rol (opcional)
                            if ("ROLE_ADMIN".equals(role)) {
                                response.sendRedirect("/index.html");
                            } else {
                                response.sendRedirect("/user.html");
                            }
                        })
                )
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler())  // Utiliza el AccessDeniedHandler personalizado
                .and()
                .authorizeRequests(authorize ->
                        authorize
                                .requestMatchers("/index.html").hasAuthority("ROLE_ADMIN")  // Bloquear acceso a index.html para ROLE_ADMIN
                                .requestMatchers("/user.html").hasAuthority("ROLE_USER")
                                .requestMatchers("/rest/all").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                                .requestMatchers("/rest/save/**", "/rest/edit/**", "/rest/delete/**").hasAuthority("ROLE_ADMIN")
                        .anyRequest().authenticated()
                )
                .build();
    }
    @Bean
    public CustomAccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

/*

@Bean
public SecurityFilterChain filterchain(HttpSecurity httsecurity) throws Exception {
    return httsecurity
            .csrf().disable().build();
}
*/

}


