import { useForm } from "react-hook-form";
import validator from "validator";

function GoodForm() {
  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch
  } = useForm();
  
  const watchPasswords = watch('password');
  // console.log({errors});
  
  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register('name', { required: true })}
          />
        {errors?.name?.type === "required" && <p className="error-message">Name is required</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register('email', { required: true, validate: (value) => validator.isEmail(value) })}
          />
        {errors?.email?.type === "required" && <p className="error-message">Email is required</p>}
        {errors?.email?.type === "validate" && <p className="error-message">Email is invalid</p>}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register('password', { required: true, minLength: 7 })}
        />
        {errors?.password?.type === "required" && <p className="error-message">Password is required</p>}
        {errors?.password?.type === "minLength" && <p className="error-message">Password must have at least 7 characters</p>}
      </div>

      <div className="form-group">
        <label>Confirmação de senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Digite sua senha novamente"
          {...register('passwordConfirmation', { required: true, validate: (value) => value === watchPasswords})}
            />
        {errors?.passwordConfirmation?.type === "required" && <p className="error-message">Password confirmation is required</p>}
        {errors?.passwordConfirmation?.type === "validate" && <p className="error-message">Passwords don't match</p>}
        </div>
        
        <div className="form-group">
        <label>Profissão</label>
        <select
          {...register('profession', { validate: (value) => value !== 0})}
          className={errors?.profession && "input-error"}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type === "validate" && <p className="error-message">Profession is required</p>}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register('privacyTerms', { required: true })}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "required" && <p className="error-message">You must agree with our privacy terms</p>}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;