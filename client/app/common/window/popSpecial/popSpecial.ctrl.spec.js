import PopSpecialModule from './popSpecial'
import PopSpecialController from './popSpecial.ctrl';
import PopSpecialComponent from './popSpecial.comp';
import PopSpecialTemplate from './popSpecial.html';

describe('PopSpecial', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PopSpecialModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PopSpecialController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(PopSpecialTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PopSpecialComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PopSpecialTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PopSpecialController);
      });
  });
});
